import { connection } from "../core/database.js";

class Notify {
    constructor() {
        this.helper = new NotifyHelper();
    }

    async notify(account_id) {
        try {
            const dates = this.helper.getDates();

            const today = dates.today;
            const yesteryday = dates.yesterday;

            const result = {
                today: [],
                yesterday: []
            }

            const todayComments = await this.helper.getComment(account_id, dates.today);
            const yesterdayComments = await  this.helper.getComment(account_id, dates.yesterday);

            result.today.push(...todayComments); 
            result.yesterday.push(...yesterdayComments)

            console.log(result)

        }catch(err) {
            console.error(err)
            throw err;
        }
    }
}

class NotifyHelper {
    async getComment(account_id, date) {
        try {
            const [userLoggedInPost] = await connection.execute(
                `SELECT * FROM threads WHERE account_id = ? AND parent_thread_id is NULL`,
                [account_id]
            )

            if (userLoggedInPost.length === 0) {
                return [];
            }

            const commentPromises = userLoggedInPost.map(post =>
                connection.execute(
                    `SELECT * FROM threads WHERE parent_thread_id = ? AND DATE(created_at) = ?`,
                    [post.thread_id, date]
                )
            );
    
            const results = await Promise.all(commentPromises);
    
            const threadComments = results.flatMap(([comments]) => comments);
    
            return threadComments;
        }catch(err) {
            console.error(err)
            throw err
        }
    }

    getDates() {
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(today.getDate() - 1);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            today: formatDate(today),
            yesterday: formatDate(yesterday),
        };
    }
}


export default Notify;