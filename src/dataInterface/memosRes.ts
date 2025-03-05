/**
 * v1ListMemosResponse
 */
export interface Response {
    memos?: Apiv1Memo[];
    /**
     * A token, which can be sent as `page_token` to retrieve the next page.
     * If this field is omitted, there are no subsequent pages.
     */
    nextPageToken?: string;
    [property: string]: any;
}

/**
 * apiv1Memo
 */
export interface Apiv1Memo {
    content?: string;
    createTime?: Date;
    /**
     * The name of the creator.
     * Format: users/{user}
     */
    creator?: string;
    displayTime?: Date;
    location?: Apiv1Location;
    /**
     * The name of the memo.
     * Format: memos/{memo}, memo is the user defined id or uuid.
     */
    name?: string;
    nodes?: V1Node[];
    /**
     * The name of the parent memo.
     * Format: memos/{id}
     */
    parent?: string;
    pinned?: boolean;
    property?: V1MemoProperty;
    reactions?: V1Reaction[];
    relations?: V1MemoRelation[];
    resources?: V1Resource[];
    /**
     * The snippet of the memo content. Plain text only.
     */
    snippet?: string;
    state?: V1State;
    tags?: string[];
    updateTime?: Date;
    visibility?: V1Visibility;
    [property: string]: any;
}

/**
 * apiv1Location
 */
export interface Apiv1Location {
    latitude?: number;
    longitude?: number;
    placeholder?: string;
    [property: string]: any;
}

/**
 * v1UnorderedListItemNode
 */
export interface V1UnorderedListItemNode {
    children?: V1Node[];
    indent?: number;
    symbol?: string;
    [property: string]: any;
}

/**
 * v1TaskListItemNode
 */
export interface V1TaskListItemNode {
    children?: V1Node[];
    complete?: boolean;
    indent?: number;
    symbol?: string;
    [property: string]: any;
}

/**
 * TableNodeRow
 */
export interface TableNodeRow {
    cells?: V1Node[];
    [property: string]: any;
}

/**
 * v1TableNode
 */
export interface V1TableNode {
    delimiter?: string[];
    header?: V1Node[];
    rows?: TableNodeRow[];
    [property: string]: any;
}

/**
 * v1ParagraphNode
 */
export interface V1ParagraphNode {
    children?: V1Node[];
    [property: string]: any;
}

/**
 * v1OrderedListItemNode
 */
export interface V1OrderedListItemNode {
    children?: V1Node[];
    indent?: number;
    number?: string;
    [property: string]: any;
}

/**
 * v1ListNode
 */
export interface V1ListNode {
    children?: V1Node[];
    indent?: number;
    kind?: ListNodeKind;
    [property: string]: any;
}

/**
 * v1HeadingNode
 */
export interface V1HeadingNode {
    children?: V1Node[];
    level?: number;
    [property: string]: any;
}

/**
 * v1BoldNode
 */
export interface V1BoldNode {
    children?: V1Node[];
    symbol?: string;
    [property: string]: any;
}

/**
 * v1BlockquoteNode
 */
export interface V1BlockquoteNode {
    children?: V1Node[];
    [property: string]: any;
}

/**
 * v1Node
 */
export interface V1Node {
    autoLinkNode?: V1AutoLinkNode;
    blockquoteNode?: V1BlockquoteNode;
    boldItalicNode?: V1BoldItalicNode;
    boldNode?: V1BoldNode;
    codeBlockNode?: V1CodeBlockNode;
    codeNode?: V1CodeNode;
    embeddedContentNode?: V1EmbeddedContentNode;
    escapingCharacterNode?: V1EscapingCharacterNode;
    headingNode?: V1HeadingNode;
    highlightNode?: V1HighlightNode;
    horizontalRuleNode?: V1HorizontalRuleNode;
    htmlElementNode?: V1HTMLElementNode;
    imageNode?: V1ImageNode;
    italicNode?: V1ItalicNode;
    lineBreakNode?: { [key: string]: any };
    linkNode?: V1LinkNode;
    listNode?: V1ListNode;
    mathBlockNode?: V1MathBlockNode;
    mathNode?: V1MathNode;
    orderedListItemNode?: V1OrderedListItemNode;
    paragraphNode?: V1ParagraphNode;
    referencedContentNode?: V1ReferencedContentNode;
    spoilerNode?: V1SpoilerNode;
    strikethroughNode?: V1StrikethroughNode;
    subscriptNode?: V1SubscriptNode;
    superscriptNode?: V1SuperscriptNode;
    tableNode?: V1TableNode;
    tagNode?: V1TagNode;
    taskListItemNode?: V1TaskListItemNode;
    textNode?: V1TextNode;
    type?: V1NodeType;
    unorderedListItemNode?: V1UnorderedListItemNode;
    [property: string]: any;
}

/**
 * ListNodeKind
 */
export enum ListNodeKind {
    Description = 'DESCRIPTION',
    KindUnspecified = 'KIND_UNSPECIFIED',
    Ordered = 'ORDERED',
    Unordered = 'UNORDERED'
}

/**
 * v1AutoLinkNode
 */
export interface V1AutoLinkNode {
    isRawText?: boolean;
    url?: string;
    [property: string]: any;
}

/**
 * v1BoldItalicNode
 */
export interface V1BoldItalicNode {
    content?: string;
    symbol?: string;
    [property: string]: any;
}

/**
 * v1CodeBlockNode
 */
export interface V1CodeBlockNode {
    content?: string;
    language?: string;
    [property: string]: any;
}

/**
 * v1CodeNode
 */
export interface V1CodeNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1EmbeddedContentNode
 */
export interface V1EmbeddedContentNode {
    params?: string;
    resourceName?: string;
    [property: string]: any;
}

/**
 * v1EscapingCharacterNode
 */
export interface V1EscapingCharacterNode {
    symbol?: string;
    [property: string]: any;
}

/**
 * v1HighlightNode
 */
export interface V1HighlightNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1HorizontalRuleNode
 */
export interface V1HorizontalRuleNode {
    symbol?: string;
    [property: string]: any;
}

/**
 * v1HTMLElementNode
 */
export interface V1HTMLElementNode {
    attributes?: { [key: string]: string };
    tagName?: string;
    [property: string]: any;
}

/**
 * v1ImageNode
 */
export interface V1ImageNode {
    altText?: string;
    url?: string;
    [property: string]: any;
}

/**
 * v1ItalicNode
 */
export interface V1ItalicNode {
    content?: string;
    symbol?: string;
    [property: string]: any;
}

/**
 * v1LinkNode
 */
export interface V1LinkNode {
    text?: string;
    url?: string;
    [property: string]: any;
}

/**
 * v1MathBlockNode
 */
export interface V1MathBlockNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1MathNode
 */
export interface V1MathNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1ReferencedContentNode
 */
export interface V1ReferencedContentNode {
    params?: string;
    resourceName?: string;
    [property: string]: any;
}

/**
 * v1SpoilerNode
 */
export interface V1SpoilerNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1StrikethroughNode
 */
export interface V1StrikethroughNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1SubscriptNode
 */
export interface V1SubscriptNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1SuperscriptNode
 */
export interface V1SuperscriptNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1TagNode
 */
export interface V1TagNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1TextNode
 */
export interface V1TextNode {
    content?: string;
    [property: string]: any;
}

/**
 * v1NodeType， - LINE_BREAK: Block nodes.
 * - TEXT: Inline nodes.
 */
export enum V1NodeType {
    AutoLink = 'AUTO_LINK',
    Blockquote = 'BLOCKQUOTE',
    Bold = 'BOLD',
    BoldItalic = 'BOLD_ITALIC',
    Code = 'CODE',
    CodeBlock = 'CODE_BLOCK',
    EmbeddedContent = 'EMBEDDED_CONTENT',
    EscapingCharacter = 'ESCAPING_CHARACTER',
    HTMLElement = 'HTML_ELEMENT',
    Heading = 'HEADING',
    Highlight = 'HIGHLIGHT',
    HorizontalRule = 'HORIZONTAL_RULE',
    Image = 'IMAGE',
    Italic = 'ITALIC',
    LineBreak = 'LINE_BREAK',
    Link = 'LINK',
    List = 'LIST',
    Math = 'MATH',
    MathBlock = 'MATH_BLOCK',
    NodeUnspecified = 'NODE_UNSPECIFIED',
    OrderedListItem = 'ORDERED_LIST_ITEM',
    Paragraph = 'PARAGRAPH',
    ReferencedContent = 'REFERENCED_CONTENT',
    Spoiler = 'SPOILER',
    Strikethrough = 'STRIKETHROUGH',
    Subscript = 'SUBSCRIPT',
    Superscript = 'SUPERSCRIPT',
    Table = 'TABLE',
    Tag = 'TAG',
    TaskListItem = 'TASK_LIST_ITEM',
    Text = 'TEXT',
    UnorderedListItem = 'UNORDERED_LIST_ITEM'
}

/**
 * v1MemoProperty
 */
export interface V1MemoProperty {
    hasCode?: boolean;
    hasIncompleteTasks?: boolean;
    hasLink?: boolean;
    hasTaskList?: boolean;
    [property: string]: any;
}

/**
 * v1Reaction
 */
export interface V1Reaction {
    /**
     * The content identifier.
     * For memo, it should be the `Memo.name`.
     */
    contentId?: string;
    /**
     * The name of the creator.
     * Format: users/{user}
     */
    creator?: string;
    id?: number;
    reactionType?: string;
    [property: string]: any;
}

/**
 * v1MemoRelation
 */
export interface V1MemoRelation {
    memo?: V1MemoRelationMemo;
    relatedMemo?: V1MemoRelationMemo;
    type?: V1MemoRelationType;
    [property: string]: any;
}

/**
 * v1MemoRelationMemo
 */
export interface V1MemoRelationMemo {
    /**
     * The name of the memo.
     * Format: memos/{id}
     */
    name?: string;
    /**
     * The snippet of the memo content. Plain text only.
     */
    snippet?: string;
    uid?: string;
    [property: string]: any;
}

/**
 * v1MemoRelationType
 */
export enum V1MemoRelationType {
    Comment = 'COMMENT',
    Reference = 'REFERENCE',
    TypeUnspecified = 'TYPE_UNSPECIFIED'
}

/**
 * v1Resource
 */
export interface V1Resource {
    content?: string;
    createTime?: Date;
    externalLink?: string;
    filename?: string;
    /**
     * The related memo. Refer to `Memo.name`.
     */
    memo?: string;
    /**
     * The name of the resource.
     * Format: resources/{resource}, resource is the user defined if or uuid.
     */
    name?: string;
    size?: string;
    type?: string;
    [property: string]: any;
}

/**
 * v1State
 */
export enum V1State {
    Archived = 'ARCHIVED',
    Normal = 'NORMAL',
    StateUnspecified = 'STATE_UNSPECIFIED'
}

/**
 * v1Visibility
 */
export enum V1Visibility {
    Private = 'PRIVATE',
    Protected = 'PROTECTED',
    Public = 'PUBLIC',
    VisibilityUnspecified = 'VISIBILITY_UNSPECIFIED'
}
