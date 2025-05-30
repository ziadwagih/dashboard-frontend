import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import html2canvas from 'html2canvas';

const CryptoChart = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candleSeriesRef = useRef(null);
  const emaSeriesRef = useRef(null);
  const rsiSeriesRef = useRef(null);

  const [theme, setTheme] = useState(localStorage.getItem('chartTheme') || 'dark');
  const [isLine, setIsLine] = useState(false);
  const [showRSI, setShowRSI] = useState(false);
  const [data, setData] = useState([]);

  // Fetch historical data once
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000');
      const json = await res.json();
      const transformed = json.map(d => ({
        time: Math.floor(d[0] / 1000),
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5]),
      }));
      setData(transformed);
    };
    fetchData();
  }, []);

  const applyTheme = (chart, theme) => {
    const dark = theme === 'dark';
    chart.applyOptions({
      layout: {
        background: { color: dark ? '#0d1117' : '#ffffff' },
        textColor: dark ? '#c9d1d9' : '#222',
      },
      grid: {
        vertLines: { color: dark ? '#21262d' : '#ccc' },
        horzLines: { color: dark ? '#21262d' : '#ccc' },
      },
    });
  };

  const calculateEMA = (data, period = 20) => {
    const k = 2 / (period + 1);
    let ema = data[0].close;
    return data.map((d, i) => {
      ema = i === 0 ? d.close : d.close * k + ema * (1 - k);
      return { time: d.time, value: parseFloat(ema.toFixed(2)) };
    });
  };

  const calculateRSI = (data, period = 14) => {
    const rsiData = [];
    let gains = 0;
    let losses = 0;
    for (let i = 1; i <= period; i++) {
      const change = data[i].close - data[i - 1].close;
      change >= 0 ? (gains += change) : (losses -= change);
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    rsiData.push({
      time: data[period].time,
      value: 100 - 100 / (1 + avgGain / avgLoss),
    });

    for (let i = period + 1; i < data.length; i++) {
      const change = data[i].close - data[i - 1].close;
      avgGain = (avgGain * (period - 1) + (change > 0 ? change : 0)) / period;
      avgLoss = (avgLoss * (period - 1) + (change < 0 ? -change : 0)) / period;
      rsiData.push({
        time: data[i].time,
        value: 100 - 100 / (1 + avgGain / avgLoss),
      });
    }
    return rsiData;
  };

  // Create chart once
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 400,
      crosshair: { mode: CrosshairMode.Normal },
      layout: { fontFamily: 'Sora, sans-serif' },
    });

    chartRef.current = chart;
    applyTheme(chart, theme);

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: container.clientWidth });
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  // Handle theme switch
  useEffect(() => {
    if (chartRef.current) {
      applyTheme(chartRef.current, theme);
    }
  }, [theme]);

  // Update chart series
  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    try {
      if (candleSeriesRef.current) {
        chartRef.current.removeSeries(candleSeriesRef.current);
        candleSeriesRef.current = null;
      }
      if (emaSeriesRef.current) {
        chartRef.current.removeSeries(emaSeriesRef.current);
        emaSeriesRef.current = null;
      }
      if (rsiSeriesRef.current) {
        chartRef.current.removeSeries(rsiSeriesRef.current);
        rsiSeriesRef.current = null;
      }

      const mainSeries = isLine
        ? chartRef.current.addLineSeries({ color: 'skyblue' })
        : chartRef.current.addCandlestickSeries();
      mainSeries.setData(data);
      candleSeriesRef.current = mainSeries;

      const ema = chartRef.current.addLineSeries({ color: 'purple', lineWidth: 2 });
      ema.setData(calculateEMA(data));
      emaSeriesRef.current = ema;

      if (showRSI) {
        const rsi = chartRef.current.addLineSeries({ color: 'orange', lineWidth: 1 });
        rsi.setData(calculateRSI(data));
        rsiSeriesRef.current = rsi;
      }
    } catch (error) {
      console.error('Chart update error:', error);
    }
  }, [data, isLine, showRSI]);

  // Live updates
  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      const k = msg.k;
      const newCandle = {
        time: Math.floor(k.t / 1000),
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };
      candleSeriesRef.current?.update(newCandle);
    };

    return () => socket.close();
  }, []);

  const exportPNG = async () => {
    const canvas = await html2canvas(chartContainerRef.current);
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportCSV = () => {
    const data = candleSeriesRef.current?.getData();
    if (!data) return;
    const csv = ['Time,Open,High,Low,Close'];
    data.forEach(d => {
      csv.push(`${d.time},${d.open},${d.high},${d.low},${d.close}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.csv';
    link.click();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('chartTheme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="p-6 space-y-6 bg-[#0d1117] rounded-xl shadow-2xl">
      <div ref={chartContainerRef} className="w-full rounded-xl" />
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { label: 'Toggle Theme', action: toggleTheme, color: 'bg-gray-800' },
          { label: 'Candlestick/Line', action: () => setIsLine(p => !p), color: 'bg-blue-700' },
          { label: 'Toggle RSI', action: () => setShowRSI(p => !p), color: 'bg-purple-700' },
          { label: 'Export PNG', action: exportPNG, color: 'bg-green-700' },
          { label: 'Export CSV', action: exportCSV, color: 'bg-yellow-600' },
        ].map(({ label, action, color }) => (
          <button
            key={label}
            onClick={action}
            className={`px-5 py-2 rounded-xl text-sm font-semibold text-white ${color} 
              shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200
              backdrop-blur-sm bg-opacity-90`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CryptoChart;
