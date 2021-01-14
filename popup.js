let token_input = document.getElementById('token_value')

token_input.addEventListener('keyup', () => {
    chrome.storage.local.set({ token: token_input.value })
})

chrome.storage.local.get('token', ({ token }) => {
    if (token) {
        token_input.value = token
    }
})
