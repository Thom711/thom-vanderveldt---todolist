async function getData() {
    const response = await fetch(`https://jsonbox.io/box_ef8b69b40ba5e2295eee`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    };

    const data = await response.json();

    return await data;
};

async function postData(data) {
    await fetch(`https://jsonbox.io/box_ef8b69b40ba5e2295eee`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

async function putData(data, id) {
    await fetch(`https://jsonbox.io/box_ef8b69b40ba5e2295eee/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });
};

async function deleteData(id) {
    await fetch(`https://jsonbox.io/box_ef8b69b40ba5e2295eee/${id}`, {
        method: "DELETE",
    });
};