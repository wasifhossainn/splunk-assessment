# Splunk Assessment

This project is a React-based application for configuring server models based on user inputs.

## Features

- Select CPU Model (X86, Power, ARM)
- Input memory size with validation
- Option to include a GPU Accelerator Card
- Displays available server models based on the configuration
- Handles invalid configurations with a "No Options" message

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/splunk-assessment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd splunk-assessment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Testing

Run the test suite:

```bash
npm test
```

### Key Test Cases

1. **Invalid Memory Input**:
   - Ensures an error message is displayed for memory sizes below 2048 MB.
2. **Valid ARM Configuration**:
   - Displays "High Density Server" for valid ARM configurations.
3. **Valid Power Configuration**:
   - Displays "Mainframe" for valid Power configurations.
4. **Invalid Configuration**:
   - Displays "No Options" when no server models match the configuration.

### Debugging Tests

If a test fails, use `screen.debug()` in the test file to inspect the DOM and verify the rendered output.

## Folder Structure

- `src/components`: Contains React components like `ConfigurationForm`.
- `src/utils`: Utility functions for validation and rules engine.
- `src/types`: Type definitions for the application.

## ConfigurationForm Component

The `ConfigurationForm` component allows users to configure server models. It includes:

- A dropdown for selecting the CPU model.
- A text field for entering memory size with validation.
- A checkbox for enabling/disabling the GPU Accelerator Card.
- A submit button to find matching server models.

### Error Handling

- Displays error messages for invalid memory inputs.
- Shows "No Options" when no server models match the configuration.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.
