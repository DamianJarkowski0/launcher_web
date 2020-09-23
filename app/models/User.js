export default class user {
    username = '';

    /**
     * User constructor
     * @param {object} user .
     */
    constructor(user) {
        if (user === undefined) {
            this.username = 'Quest';
        }
    }

    getUsername = () => {
        return `Username: ${this.username}`;
    }
}
