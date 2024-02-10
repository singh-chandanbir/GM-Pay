# GM-Pay - Crypto Payment Gateway

## Team: TechyTrek

### Team Members:
- Chandanbir Singh
- Ankush Makkar
- Abhishek Sharma
- Harkirat Singh

## Project Overview:

GM-Pay is a crypto payment gateway developed by TechyTrek for the Thapar University hackathon. The gateway facilitates seamless cryptocurrency transactions between merchants and customers. The project is organized into two main directories: `merchant-site` and `GM-Pay`.

### Prerequisites:

- MetaMask: Ensure that MetaMask is installed and configured in your browser to handle cryptocurrency transactions.
- Python Libraries: Check and install the required Python libraries listed in the `requirements.txt` file.

## Directory Structure:

1. **GM-Pay:**
   - This directory contains the code for the GM-Pay crypto payment gateway.
   - The gateway handles cryptocurrency transactions securely and efficiently.
   - Ensure to run this code on a server accessible to both merchants and customers.

2. **merchant-site:**
   - This directory includes a demo merchant site that integrates with the GM-Pay gateway.
   - Merchants can use this as a reference to implement the GM-Pay gateway into their own websites.

## Setup:

1. **Clone the repository:**
   clone this repo


2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt

    ```

## Run Flask Servers:

3. **Run Flask Servers:**
    - Navigate to the `GM-Pay` directory and start the Flask server:
        ```bash
        cd GM-Pay
        python3 app.py
        ```
    - Open another terminal, navigate to the `merchant-site` directory, and start the Flask server:
        ```bash
        cd merchant-site
        python3 app.py
        ```

## Access the Demo Merchant Site:

4. **Access the Demo Merchant Site:**
    - Open your browser and go to `http://127.0.0.1:8080` to access the demo merchant site.

## Usage:

1. Visit the demo merchant site and explore the integration with the GM-Pay payment gateway.

2. Select products, proceed to checkout, and choose cryptocurrency as the payment option.

3. Connect your MetaMask wallet and complete the transaction securely.

## API Integration:

- We used Beeceptor to fetch the Matic price through APIs.

## Additional Information:

- This project was developed as part of the Thapar University hackathon by Team TechyTrek.

- For any questions, issues, or feedback, contact the team members: Chandanbir, Ankush, Abhishek, and Harkirat.

- Feel free to customize and extend the code for your specific needs.

Thank you for using GM-Pay! We appreciate your support and feedback.


## Demo Video: