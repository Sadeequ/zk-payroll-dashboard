# ZK Payroll Dashboard

Admin dashboard for managing private payroll on Stellar.

## Overview

ZK Payroll Dashboard provides a web interface for companies to manage employees, process payroll, and handle compliance audits — all while keeping salary data private on-chain.

## Features

- 🏢 **Company Management** — Register and configure your organization
- 👥 **Employee Directory** — Add, update, and manage employees
- 💰 **Payroll Processing** — One-click batch payroll with ZK proofs
- 📊 **Analytics** — Payment history and spending insights
- 🔍 **Audit Portal** — Generate view keys for compliance audits
- 🔐 **Wallet Integration** — Connect with Freighter or other Stellar wallets

## Screenshots

```
┌─────────────────────────────────────────────────────────────────┐
│  ZK Payroll                                    [Connect Wallet] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dashboard    Employees    Payroll    Audits    Settings        │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │ Total Employees  │  │ Monthly Payroll  │  │ Next Payment   │ │
│  │       24         │  │    $156,000      │  │   Feb 28       │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
│                                                                 │
│  Recent Payments                                                │
│  ├─ Jan 2026 ✓ Completed - 24 employees - $156,000             │
│  ├─ Dec 2025 ✓ Completed - 23 employees - $148,500             │
│  └─ Nov 2025 ✓ Completed - 23 employees - $148,500             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Wallet**: Freighter API
- **SDK**: @zkpayroll/sdk

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Freighter wallet browser extension

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/zk-payroll-dashboard.git
cd zk-payroll-dashboard

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_REGISTRY_CONTRACT=CXXXX...
NEXT_PUBLIC_COMMITMENT_CONTRACT=CXXXX...
NEXT_PUBLIC_VERIFIER_CONTRACT=CXXXX...
NEXT_PUBLIC_EXECUTOR_CONTRACT=CXXXX...
```

## Project Structure

```
zk-payroll-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Dashboard home
│   ├── employees/
│   │   ├── page.tsx              # Employee list
│   │   ├── [id]/page.tsx         # Employee details
│   │   └── new/page.tsx          # Add employee
│   ├── payroll/
│   │   ├── page.tsx              # Payroll overview
│   │   ├── process/page.tsx      # Process payroll
│   │   └── history/page.tsx      # Payment history
│   ├── audits/
│   │   ├── page.tsx              # Audit management
│   │   └── keys/page.tsx         # View key management
│   └── settings/
│       └── page.tsx              # Company settings
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── layout/                   # Layout components
│   ├── employees/                # Employee-related components
│   ├── payroll/                  # Payroll components
│   └── wallet/                   # Wallet connection
├── lib/
│   ├── zkpayroll.ts              # SDK wrapper
│   ├── wallet.ts                 # Wallet utilities
│   └── utils.ts                  # Helper functions
├── stores/
│   ├── company.ts                # Company state
│   ├── employees.ts              # Employee state
│   └── wallet.ts                 # Wallet state
├── types/
│   └── index.ts
├── public/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Development

### Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run tests
pnpm typecheck    # TypeScript check
```

### Code Style

- Use TypeScript strict mode
- Follow React best practices
- Use server components where possible
- Keep components small and focused

## Pages

### Dashboard (`/`)
Overview with key metrics, recent payments, and quick actions.

### Employees (`/employees`)
- List all employees with search/filter
- Add new employees with salary input
- Edit employee details and salary
- Deactivate employees

### Payroll (`/payroll`)
- View current pay period
- Process batch payroll
- Payment history and receipts
- Export payment data (encrypted)

### Audits (`/audits`)
- Generate view keys for auditors
- Set access scope and duration
- Track active view keys
- Revoke access when needed

### Settings (`/settings`)
- Company profile
- Treasury configuration
- Notification preferences
- Contract addresses

## Security

- All sensitive operations require wallet signature
- Salary data stored locally with encryption
- Blinding factors never leave the browser
- View keys are time-limited and revocable

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Issues labeled `stellar-wave` are eligible for Wave Program rewards.

### Good First Issues

- UI/UX improvements
- Accessibility enhancements
- Documentation updates
- Test coverage

## License

MIT License — see [LICENSE](LICENSE)
