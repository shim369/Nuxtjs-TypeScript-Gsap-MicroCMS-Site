<template>
    <main class="page">
        <header class="page-head">
            <div class="container">
                <span class="eyebrow" data-reveal><span class="num">01</span>About</span>
                <h1 class="display split">Elevate your web development with <em>Nuxt 3</em></h1>
                <p class="page-lead" data-reveal>Web development has been evolving rapidly, and in this era of change,
                    Nuxt 3 emerges as an avant-garde framework that empowers developers to craft impeccable web experiences.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio distinctio optio quaerat error esse deleniti
                    quos velit vitae ad pariatur voluptate iste officia laborum, nobis unde delectus libero consectetur dolorum!
                </p>
            </div>
            <span class="ghost" aria-hidden="true">About</span>
        </header>

        <section class="page-body">
            <div class="container">
                <div class="sec-head">
                    <span class="eyebrow" data-reveal><span class="num">02</span>Why Nuxt 3?</span>
                </div>
                <div class="card-grid">
                    <article class="info-card" v-for="(feature, index) in features" :key="index" data-reveal>
                        <span class="big">{{ String(index + 1).padStart(2, '0') }}</span>
                        <h2>{{ feature.title }}</h2>
                        <p>{{ feature.description }}</p>
                    </article>
                </div>
                <p class="page-outro" data-reveal>In a nutshell, Nuxt 3 is not just a framework; it's a movement towards a more efficient,
                    performative, and seamless web development experience. Whether you're building a personal blog, an
                    e-commerce site, or a large-scale web application, Nuxt 3 provides a robust foundation to ensure success.
                </p>
            </div>
        </section>
        <Cta />
    </main>
</template>
<script setup lang="ts">
usePageReveal()

useHead({
    title: 'About | Nuxt Base',
    meta: [
        { name: 'description', content: 'Nuxt Base is a website by Nuxt 3' }
    ]
})

const features = [
  {
    title: 'Built on Vue 3',
    description: 'Nuxt 3 inherits all the advantages of Vue 3. This means developers can utilize the reactivity system, composition API, and more, resulting in cleaner and more efficient code.'
  },
  {
    title: 'High Performance',
    description: 'Speed matters. Nuxt 3 ensures that your web applications run smoothly, providing an optimal user experience. With server-side rendering (SSR), your application starts faster, improving SEO and user engagement.'
  },
  {
    title: 'Efficient Development Support',
    description: 'With features such as hot module replacement and a comprehensive development environment, developers can quickly build, test, and iterate on their projects.'
  },
  {
    title: 'Automatic Routing',
    description: 'Forget the hassle of manually configuring routes. Nuxt 3 auto-generates them based on your file structure. This not only simplifies the development process but also reduces the risk of errors.'
  },
  {
    title: 'SSR & SSG Capabilities',
    description: 'Whether you need a dynamic application with Server-Side Rendering (SSR) or a lightning-fast static site with Static Site Generation (SSG), Nuxt 3 has got you covered. It enables developers to decide the best approach for their projects.'
  },
  {
    title: 'Customization & Extension',
    description: 'Nuxt 3 is designed to be flexible. With its modular architecture, you can easily customize and extend the framework to suit your needs. Plugins, modules, and community-contributed extensions ensure that you have all the tools at your disposal.'
  },
  {
    title: 'Vibrant Community & Ecosystem',
    description: 'One of Nuxt 3\'s greatest strengths is its community. From novice developers to experts, there\'s a passionate group of individuals constantly contributing to its growth. With a plethora of plugins, modules, and tutorials available, you\'re never alone in your development journey.'
  }
];
</script>