function Notification(title, message) {
    return {
        title,
        message,
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true
        }
    }
}

export function Success(message, title="Success") {
    return {
        ...Notification(title, message),
        type: "success"
    }
}

export function Warning(message, title="Warning") {
    return {
        ...Notification(title, message),
        type: "warning"
    }
}

export function Error(message, title="Error") {
    return {
        ...Notification(title, message),
        type: "danger"
    }
}