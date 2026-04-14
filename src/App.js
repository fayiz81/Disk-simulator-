import React, { useState } from "react";
import { motion } from "framer-motion";

const algorithms = ["FCFS", "SSTF", "SCAN", "C-SCAN"];

function calculateFCFS(requests, head) {
  let seek = 0;
  let current = head;
  let order = [head];

  requests.forEach((req) => {
    seek += Math.abs(current - req);
    current = req;
    order.push(req);
  });

  return { seek, order };
}

function calculateSSTF(requests, head) {
  let seek = 0;
  let current = head;
  let pending = [...requests];
  let order = [head];

  while (pending.length) {
    let closest = pending.reduce((prev, curr) =>
      Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
    );

    seek += Math.abs(current - closest);
    current = closest;
    order.push(closest);
    pending = pending.filter((r) => r !== closest);
  }

  return { seek, order };
}

function calculateSCAN(requests, head, diskSize = 200) {
  let seek = 0;
  let current = head;
  let left = requests.filter((r) => r < head).sort((a, b) => b - a);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);
  let order = [head];

  right.forEach((r) => {
    seek += Math.abs(current - r);
    current = r;
    order.push(r);
  });

  left.forEach((r) => {
    seek += Math.abs(current - r);
    current = r;
    order.push(r);
  });

  return { seek, order };
}

function calculateCSCAN(requests, head, diskSize = 200) {
  let seek = 0;
  let current = head;
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r >= head).sort((a, b) => a - b);
  let order = [head];

  right.forEach((r) => {
    seek += Math.abs(current - r);
    current = r;
    order.push(r);
  });

  current = 0;

  left.forEach((r) => {
    seek += Math.abs(current - r);
    current = r;
    order.push(r);
  });

  return { seek, order };
}

export default function DiskScheduler() {
  const [requests, setRequests] = useState("98,183,37,122,14,124,65,67");
  const [head, setHead] = useState(53);
  const [algo, setAlgo] = useState("FCFS");
  const [result, setResult] = useState(null);

  const handleRun = () => {
    const reqArray = requests.split(",").map(Number);
    let res;

    switch (algo) {
      case "FCFS": res = calculateFCFS(reqArray, head); break;
      case "SSTF": res = calculateSSTF(reqArray, head); break;
      case "SCAN": res = calculateSCAN(reqArray, head); break;
      case "C-SCAN": res = calculateCSCAN(reqArray, head); break;
      default: return;
    }

    setResult(res);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6">🚀 Disk Scheduling Simulator</h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 outline-none"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="Enter requests"
          />

          <input
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-400 outline-none"
            type="number"
            value={head}
            onChange={(e) => setHead(Number(e.target.value))}
            placeholder="Head position"
          />

          <select
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
          >
            {algorithms.map((a) => (
              <option key={a} className="text-black">{a}</option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold"
            onClick={handleRun}
          >
            Run Simulation
          </motion.button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-white/10 rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <p>Total Seek Time: {result.seek}</p>
            <p>Average Seek Time: {(result.seek / requests.split(",").length).toFixed(2)}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Head Movement</h3>
              <div className="flex flex-wrap gap-2">
                {result.order.map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-1 bg-blue-500 rounded-full text-sm"
                  >
                    {pos}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
