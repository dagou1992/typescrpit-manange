
export type resComment = {
    title: string,
    content: string,
    activeKey: string,
    key: string,
};

export function fetchCommentList() {
    return new Promise<resComment[]>((res, rej) => {
        const data = [{key: '1', title: 'ss', content: '11', activeKey: '1', originalContent: '11'}];
        res(data);
    });
}