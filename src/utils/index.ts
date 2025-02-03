export function getElementWrapper<T>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);
    return element as T
}

export function showEl(element: HTMLElement) {
    element.classList.remove('d-none');
}

export function hideEl(element: HTMLElement) {
    element.classList.add('d-none');
}

export function enableEl(element: HTMLElement) {
    element.removeAttribute('disabled');
}

export function disableEl(element: HTMLElement) {
    element.setAttribute('disabled', 'true');
}

export function displayAlert(message:string, timeout: number = 3000) {
    const alert = getElementWrapper<HTMLElement>('#alert');
    alert.textContent = message;
    showEl(alert);
    setTimeout(() => hideEl(alert), timeout);
}