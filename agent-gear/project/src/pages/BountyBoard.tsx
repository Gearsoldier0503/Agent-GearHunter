import React, { useState } from 'react';
import { Target, DollarSign, Clock, Filter } from 'lucide-react';

export function BountyBoard() {
  const [filters, setFilters] = useState({
    status: 'all',
    difficulty: 'all',
    minReward: '',
    maxReward: '',
  });

  const mockBounties = [
    {
      id: 1,
      target: 'hackthissite.org',
      reward: 1000,
      deadline: '2025-03-31',
      difficulty: 'Easy',
      status: 'Active',
    },
    {
      id: 2,
      target: 'web-security-academy.net',
      reward: 5000,
      deadline: '2025-04-15',
      difficulty: 'Medium',
      status: 'Active',
    },
    {
      id: 3,
      target: 'pentesterlab.com',
      reward: 10000,
      deadline: '2025-03-20',
      difficulty: 'Hard',
      status: 'Active',
    },
  ];

  const handleClaimBounty = (id: number) => {
    console.log('Claiming bounty:', id);
  };

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Bounty Board</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
            }
            className="w-full"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="number"
            placeholder="Min Reward"
            value={filters.minReward}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minReward: e.target.value }))
            }
            className="w-full"
          />

          <input
            type="number"
            placeholder="Max Reward"
            value={filters.maxReward}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxReward: e.target.value }))
            }
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          {mockBounties.map((bounty) => (
            <div
              key={bounty.id}
              className="border border-[var(--primary)] rounded p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{bounty.target}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    bounty.status === 'Active'
                      ? 'bg-[var(--primary)] text-[var(--text)]'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {bounty.status}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>${bounty.reward.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Due: {bounty.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>{bounty.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => handleClaimBounty(bounty.id)}
                className="w-full md:w-auto"
                disabled={bounty.status !== 'Active'}
              >
                Claim Bounty
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}