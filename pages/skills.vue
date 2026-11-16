<template>
    <main class="page">
        <header class="page-head">
            <div class="container">
                <span class="eyebrow" data-reveal><span class="num">01</span>Skills</span>
                <h1 class="display split">My Journey in <em>Tech</em></h1>
                <p class="page-lead" data-reveal>When I first set foot in the world of programming, my starting point was
                    JavaScript. Over the years, my technical prowess has evolved exponentially, mastering a vast array of
                    frameworks and languages.</p>
            </div>
            <span class="ghost" aria-hidden="true">Skills</span>
        </header>

        <section class="page-body">
            <div class="container">
                <div class="card-grid">
                    <article class="info-card" v-for="(skill, index) in skills" :key="skill.title" data-reveal>
                        <span class="big">{{ String(index + 1).padStart(2, '0') }}</span>
                        <h2>{{ skill.title }}</h2>
                        <p>{{ skill.description }}</p>
                    </article>
                </div>
                <p class="page-outro" data-reveal>These are but a glimpse of the skills I possess. In a world that continually evolves with
                    technology, I consistently strive to keep abreast of the latest trends and techniques, ensuring that I
                    deliver the best results in every project.</p>
            </div>
        </section>
        <Cta />
    </main>
</template>
<script setup lang="ts">
usePageReveal()

useHead({
    title: 'Skills | Nuxt Base',
    meta: [
        { name: 'description', content: 'Nuxt Base is a website by Nuxt 3' }
    ]
})

const skills = ref([
    {
        title: 'Static Site Generation with Astro',
        description: 'I\'ve honed my skills in Astro to craft fast, SEO-optimized websites. This framework excels in static site generation, and I know how to maximize its potential.'
    },
    {
        title: 'Next.js Efficient Server-Side Rendering',
        description: 'With Next.js, I deliver efficient server-side rendering, providing a seamless browsing experience for users.'
    },
    {
        title: 'Nuxt.js Powerful Server-Side Rendering',
        description: 'Using Nuxt.js, I ensure powerful server-side rendering, resulting in a smooth and uninterrupted browsing experience for users.'
    },
    {
        title: 'Back-End Development with Python and Django',
        description: 'Building efficient and secure back-end systems is one of my core skills. I develop robust systems using Python and Django.'
    },
    {
        title: 'microCMS Blog and Contact Features',
        description: 'microCMS serves as the backbone of our blog, letting content be managed separately from the code, while the contact form runs on Nuxt server routes. This simplifies content management and streamlines website development.'
    },
    {
        title: 'UI/UX Design and Prototyping with Figma',
        description: 'Figma plays a crucial role in the design process. I excel in system development, UI/UX design, and creating prototypes for client and team feedback.'
    }
]);
</script>