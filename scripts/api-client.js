const apiUri = `https://jsonbox.io/box_ef8b69b40ba5e2295eee`;

async function getData(apiUri) {
    const response = await fetch(apiUri);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    };

    const data = await response.json();

    return await data;
};

async function postData(data, apiUri) {
    await fetch(apiUri, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

async function putDataChecked(data, apiUri, id) {
    await fetch(`${apiUri}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });
};

async function putDataDescription(data, apiUri, id) {
    await fetch(`${apiUri}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });
};

async function deleteData(apiUri, id) {
    await fetch(`${apiUri}/${id}`, {
        method: "DELETE",
    });
};