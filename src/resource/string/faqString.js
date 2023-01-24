import {
    fullPath,

    routerPath
}
    from "./routerPath";

export const faqString = [
    {
        id: 0,
        partName: 'Common',
        question: '앱센터는 어떻게 들어오나요?',
        url: routerPath.faqDetail.child.common.url,
        fullUrl: fullPath.common
    },
    {
        id: 1,
        partName: 'Android',
        question: 'Java 와 Kotlin 중 어떤 언어를 쓰나요?',
        url: routerPath.faqDetail.child.android.url,
        fullUrl: fullPath.android
    },
    {
        id: 2,
        partName: 'iOS',
        question: '맥북 필수인가요?',
        url: routerPath.faqDetail.child.ios.url,
        fullUrl: fullPath.ios
    },
    {
        id: 3,
        partName: 'Server',
        question: 'Node, Spring중 어떤 것을 사용하나요?',
        url: routerPath.faqDetail.child.server.url,
        fullUrl: fullPath.server
    },
    {
        id: 4,
        partName: 'Web',
        question: 'React 할 줄 알아야 하나요?',
        url: routerPath.faqDetail.child.web.url,
        fullUrl: fullPath.web
    },
    {
        id: 5,
        partName: 'Design',
        question: 'Figma, XD 할 줄 알아야 하나요?',
        url: routerPath.faqDetail.child.design.url,
        fullUrl: fullPath.design
    },
];