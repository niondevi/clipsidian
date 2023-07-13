document.getElementById('newAction').addEventListener('click', function() {
    addAction();
});

function addAction(name = '', vault = '', path = '', format = '') {
    var div = document.createElement('div');
    div.className = 'action';

    div.innerHTML = `
        <label>Name: <input class="name" type="text" value="${name}"></label><br>
        <label>Vault: <input class="vault" type="text" value="${vault}"></label><br>
        <label>Path: <input class="path" type="text" value="${path}"></label><br>
        <label>Format: <textarea class="format">${format}</textarea></label><br>
        <button class="delete">Delete</button>
    `;

    div.querySelector('.delete').addEventListener('click', function() {
        div.remove();
        saveActions();
    });

    document.getElementById('actions').appendChild(div);
}

function saveActions() {
    var actions = [...document.querySelectorAll('.action')].map(action => {
        return {
            name: action.querySelector('.name').value,
            vault: action.querySelector('.vault').value,
            path: action.querySelector('.path').value,
            format: action.querySelector('.format').value,
        };
    });

    chrome.storage.sync.set({actions: actions});
}

window.onload = function() {
    chrome.storage.sync.get('actions', function(data) {
        (data.actions || []).forEach(action => addAction(action.name, action.vault, action.path, action.format));
    });
};

window.onbeforeunload = function() {
    saveActions();
};
