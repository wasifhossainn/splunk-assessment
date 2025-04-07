# Server Configuration Tool

A React-based frontend tool that allows users to input hardware configurations and receive possible Server Model Options based on predefined rules.

## Features

- CPU Model selection (X86, Power, ARM)
- Memory Size input with validation
- GPU Accelerator Card option
- Real-time server model recommendations
- Input validation and error handling
- Modern Material-UI interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd splunk-server-composer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

1. Select a CPU Model from the dropdown menu
2. Enter the Memory Size in MB (must be a multiple of 1024 and a power of 2)
3. Toggle the GPU Accelerator Card checkbox if needed
4. Click "Find Server Models" to see available server options

## Server Model Rules

### High Density Server

- Requires GPU Accelerator Card
- Requires ARM CPU
- Requires ≥ 524,288MB memory

### Mainframe

- Requires Power CPU
- Must follow memory constraints

### 4U Rack Server & Tower Server

- Memory ≥ 131,072MB → Either 4U Rack Server or Tower Server
- Memory < 131,072MB → Only Tower Server
- Power CPU can be used for both

### Minimum Memory Requirement

- Any model must have at least 2,048MB memory

## Testing

Run the test suite:

```bash
npm test
```

## Building for Production

Create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## License

MIT
