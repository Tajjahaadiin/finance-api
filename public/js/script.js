document.addEventListener("DOMContentLoaded", () => {
  const fetchTransactionBtn = document.getElementById("fetchTransactionBtn");
  const transactionList = document.getElementById("transactionList");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");

  fetchTransactionBtn.addEventListener("click", fetchTransaction);

  async function fetchTransaction() {
    transactionList.innerHTML = "";
    errorMessage.style.display = "none";
    loadingMessage.style.display = "block";

    try {
      const response = await fetch("/api/transactions");

      if (!response.ok) {
        throw new Error(`Http error!  status: ${response.status}`);
      }

      const transactions = await response.json();
      if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transaction found</li>";
        return;
      }
      transactions.data.forEach((transaction) => {
        const listItem = document.createElement("li");
        listItem.classList.add(transaction.type);
        listItem.innerHTML = `
        <span>${transaction.description} (${new Date(
          transaction.date
        ).toLocaleDateString()})</span>
        <span>${
          transaction.type == "Income" ? "+" : "-"
        } Rp. ${transaction.amount.toLocaleString("id-ID")}</span>
        `;
        transactionList.appendChild(listItem);
      });
      loadingMessage.style.display = "none";
    } catch (error) {
      console.error("failed to fetch transaction:", error);
      loadingMessage.style.display = "none";
      errorMessage.style.display = "block";
      errorMessage.textContent =
        "Failed to Load transaction. Please try again later.";
    }
  }
  fetchTransaction();
});
