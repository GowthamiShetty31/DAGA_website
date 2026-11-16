const faqs = [
    {
        q: "What is DAGA?",
        a: "DAGA stands for Discover Around Go Again. It is a smart local tourism business portal."
    },
    {
        q: "Which region does DAGA focus on?",
        a: "The portal focuses mainly on Dakshina Kannada and nearby tourism areas."
    },
    {
        q: "How can I explore destinations?",
        a: "Open the Destinations page and browse the available destination listings."
    },
    {
        q: "How can I book a local service?",
        a: "Open Services, select an available service and submit a booking request."
    },
    {
        q: "Are booking requests automatically confirmed?",
        a: "No. A business owner must review and respond to a booking request."
    },
    {
        q: "How can I register my tourism business?",
        a: "Use the Business Owner Registration option to submit your business details for review."
    },
    {
        q: "Can I save my favourite places?",
        a: "Use the Add to Wishlist feature on supported destination or service pages."
    },
    {
        q: "Does DAGA process online payments?",
        a: "Online payment processing is not included in the current website prototype."
    }
];

function displayFaq(search = "") {
    const container = document.getElementById("faqList");
    container.innerHTML = "";

    const filtered = faqs.filter(item =>
        (item.q + item.a).toLowerCase().includes(search.toLowerCase())
    );

    if (filtered.length === 0) {
        container.textContent = "No matching questions found.";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("details");
        card.className = "extra-card";

        const question = document.createElement("summary");
        question.textContent = item.q;

        const answer = document.createElement("p");
        answer.textContent = item.a;

        card.append(question, answer);
        container.appendChild(card);
    });
}

document.getElementById("faqSearch").addEventListener("input", function() {
    displayFaq(this.value);
});

displayFaq();