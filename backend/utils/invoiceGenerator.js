const generateInvoiceHTML = (booking, packageDetails) => {
    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    border: 1px solid #eee;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                }
                .invoice-box h2 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table th, table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                .total {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <h2>Travel Agency Invoice</h2>
                <p><strong>Customer Name:</strong> ${booking.customerName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Special Requests:</strong> ${booking.specialRequests || "None"}</p>
                <h3>Package Details</h3>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Price per Traveler</th>
                        <th>Number of Travelers</th>
                        <th>Total Price</th>
                    </tr>
                    <tr>
                        <td>${packageDetails.title}</td>
                        <td>${packageDetails.price}</td>
                        <td>${booking.numberOfTravelers}</td>
                        <td class="total">${booking.totalPrice}</td>
                    </tr>
                </table>
                <p><em>Thank you for booking with us!</em></p>
            </div>
        </body>
        </html>
    `;
};

module.exports = generateInvoiceHTML;
