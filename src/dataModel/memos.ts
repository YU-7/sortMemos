// 状态枚举
enum StateType {
    NORMAL = 'NORMAL',
    ARCHIVED = 'ARCHIVED' // 根据业务需要补充其他值
}

// 可见性枚举
enum VisibilityType {
    VISIBILITY_UNSPECIFIED = 'VISIBILITY_UNSPECIFIED',
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

// 节点类型枚举
enum NodeType {
    TASK_LIST_ITEM = 'TASK_LIST_ITEM',
    HTML_ELEMENT = 'HTML_ELEMENT',
    HIGHLIGHT = 'HIGHLIGHT',
    MATH_BLOCK = 'MATH_BLOCK',
    EMBEDDED_CONTENT = 'EMBEDDED_CONTENT'
    // 根据实际业务补充其他类型
}

// 列表类型枚举
enum ListKind {
    UNORDERED = 'UNORDERED',
    DESCRIPTION = 'DESCRIPTION',
    KIND_UNSPECIFIED = 'KIND_UNSPECIFIED',
    ORDERED = 'ORDERED'
}

// 关系类型枚举
enum RelationType {
    TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
    COMMENT = 'COMMENT'
}

// 基础节点接口
interface BaseNode {
    type?: NodeType;
    lineBreakNode?: Record<string, never>;
    paragraphNode?: {
        children?: TreeNode[];
    };
    // 其他节点类型定义...
}

// 任务列表项节点
interface TaskListItemNode {
    symbol?: string;
    indent?: number;
    complete?: boolean;
    children?: TreeNode[];
}

// 代码块节点
interface CodeBlockNode {
    language?: string;
    content?: string;
}

// 使用联合类型定义所有可能的节点类型
type TreeNode = BaseNode & {
    codeBlockNode?: CodeBlockNode;
    headingNode?: { level?: number; children?: TreeNode[] };
    taskListItemNode?: TaskListItemNode;
    // 其他 30+ 节点类型定义...
    // 根据实际数据结构补充完整
};

interface MemoRelation {
    memo?: {
        name?: string;
        uid?: string;
        snippet?: string;
    };
    relatedMemo?: {
        name?: string;
        uid?: string;
        snippet?: string;
    };
    type?: RelationType;
}

interface Reaction {
    id?: number;
    creator?: string;
    contentId?: string;
    reactionType?: string; // 可定义为枚举
}

interface Resource {
    name?: string;
    filename?: string;
    content?: string;
    externalLink?: string;
    type?: string; // 可定义为枚举
    size?: string;
    memo?: string;
    createTime?: string;
}

export interface MemoData {
    name?: string;
    state?: StateType;
    creator?: string;
    createTime?: string;
    updateTime?: string;
    displayTime?: string;
    content?: string;
    nodes?: TreeNode[];
    visibility?: VisibilityType;
    tags?: string[];
    pinned?: boolean;
    resources?: Resource[];
    relations?: MemoRelation[];
    reactions?: Reaction[];
    property?: {
        hasLink?: boolean;
        hasTaskList?: boolean;
        hasCode?: boolean;
        hasIncompleteTasks?: boolean;
    };
    parent?: string;
    snippet?: string;
    location?: {
        placeholder?: string;
        latitude?: number;
        longitude?: number;
    };
}
