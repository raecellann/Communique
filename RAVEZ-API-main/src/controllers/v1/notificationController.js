import Notify from "../../models/Notify.js";

class NotificationController {
    constructor() {
        this.notify = new Notify();
    }

    async getNotifications(req,res) {
        const { account_id } = res.locals;

        try {
            if (!account_id) {
                return res.json({
                    success: false,
                    message: "Login First",
                    data: null
                })
            }

            const resultNotify = this.notify.notify(account_id);

        }catch(err) {
            return res.json({
                success: false,
                message: "Uh oh, Something is wrong on your Notification 🚩⚠️",
                data: null
            })
        }
    }
}

export default NotificationController;