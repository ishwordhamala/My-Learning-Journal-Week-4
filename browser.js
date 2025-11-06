// =======================================
// Browser Validation API - Journal Form
// =======================================
const journalForm = document.getElementById("journal-form");

if (journalForm) {
  const weekInput = document.getElementById("week");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const message = document.getElementById("form-message");

  journalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Custom validation: reflection must have ≥10 words
    const wordCount = contentInput.value.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 10) {
      contentInput.setCustomValidity("Your reflection should be at least 10 words.");
    } else {
      contentInput.setCustomValidity("");
    }

    // Use Constraint Validation API
    if (!journalForm.checkValidity()) {
      journalForm.reportValidity();
      return;
    }

    // Valid → Save entry via Storage API
    const newEntry = {
      week: weekInput.value,
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
      date: new Date().toISOString(),
    };

    saveJournalEntry(newEntry);
    message.textContent = "Entry saved successfully!";
    message.style.color = "green";

    journalForm.reset();
  });
}
