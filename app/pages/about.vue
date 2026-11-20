<template>
    <main class="page">
        <header class="page-head">
            <div class="container">
                <span class="eyebrow" data-reveal><span class="num">01</span>About</span>
                <h1 class="display split">Elevate your web development with <em>Nuxt 4</em></h1>
                <p class="page-lead" data-reveal>Web development keeps evolving, and Nuxt 4 is the next step for the framework. Built on Vue 3, it brings a cleaner project structure, smarter data fetching and type safety by default, so developers can craft impeccable web experiences with less friction.</p>
            </div>
            <span class="ghost" aria-hidden="true">About</span>
        </header>

        <section class="page-body">
            <div class="container">
                <div class="sec-head">
                    <span class="eyebrow" data-reveal><span class="num">02</span>Why Nuxt 4?</span>
                </div>
                <div class="card-grid">
                    <article class="info-card" v-for="(feature, index) in features" :key="index" data-reveal>
                        <span class="big">{{ String(index + 1).padStart(2, '0') }}</span>
                        <h2>{{ feature.title }}</h2>
                        <p>{{ feature.description }}</p>
                    </article>
                </div>
                <p class="page-outro" data-reveal>In a nutshell, Nuxt 4 is not just a new version number; it's a more mature foundation for efficient, performant and seamless web development. Whether you're building a personal blog, an e-commerce site, or a large-scale web application, Nuxt 4 gives you a solid base to ensure success.</p>
            </div>
        </section>
        <Cta />
    </main>
</template>
<script setup lang="ts">
usePageReveal()

useSeoMeta({
  title: 'About | Nuxt Base',
  description: 'Nuxt Base is a website by Nuxt 4'
})

const features = [
  {
    title: 'Built on Vue 3',
    description: 'Nuxt 4 inherits all the advantages of Vue 3. Developers can use the reactivity system, the Composition API and modern Vue features such as reactive props destructuring, resulting in cleaner and more efficient code.'
  },
  {
    title: 'A Cleaner Project Structure',
    description: 'Application code now lives in the app/ directory, separate from server/, shared/ and node_modules. File watchers stay faster, IDEs get a clearer picture of client and server code, and the project stays easy to navigate as it grows.'
  },
  {
    title: 'Smarter Data Fetching',
    description: 'useFetch and useAsyncData share data across components that use the same key, clean up after themselves and react to changing keys. Fewer redundant requests and a more predictable behavior make pages faster and easier to reason about.'
  },
  {
    title: 'Type Safety by Default',
    description: 'The app, the server and shared code now get their own TypeScript contexts. Types for the browser and the server no longer leak into each other, and code in shared/ can be used safely on both sides.'
  },
  {
    title: 'Lazy Hydration',
    description: 'Components can postpone hydration until they become visible, the browser is idle or the user interacts with them. Heavy sections far down the page no longer slow down the first interaction.'
  },
  {
    title: 'Automatic Routing',
    description: 'Forget the hassle of manually configuring routes. Nuxt 4 generates them from your file structure, which simplifies development and reduces the risk of errors.'
  },
  {
    title: 'SSR & SSG Capabilities',
    description: 'Whether you need a dynamic application with Server-Side Rendering (SSR) or a lightning-fast static site with Static Site Generation (SSG), Nuxt 4 has you covered, and lets you decide the best approach for each project.'
  },
  {
    title: 'Customization & Ecosystem',
    description: 'Nuxt 4 is flexible by design. Its modular architecture makes it easy to customize and extend, and a passionate community keeps contributing modules, plugins and tutorials, so you are never alone on your development journey.'
  }
];
</script>
