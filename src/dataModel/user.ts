interface User {
    name: string;
    role: string; // 如果 role 是固定的几个值，可以使用联合类型，例如: "HOST" | "GUEST" | "ADMIN"
    username: string;
    email: string;
    nickname: string;
    avatarUrl: string;
    description: string;
    password: string;
    state: string; // 如果 state 是固定的几个值，可以使用联合类型，例如: "NORMAL" | "LOCKED" | "DELETED"
    createTime: string; // 可以使用 Date 类型，如果是日期对象
    updateTime: string; // 可以使用 Date 类型，如果是日期对象
}
