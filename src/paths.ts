const paths = {
    home() {
        return '/';
    },
    topicCreate() {
        return `/topics/new`;
    },
    topicShow(topicSlug: string) {
        return `/topics/${topicSlug}`;
    },
};

export default paths;