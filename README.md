# Rapid Prototyping System
By Thomas Verhappen

This system is designed to help devs create functional prototypes with as little resistance along the way as possible. This system isn't finished nor is it set in stone, if you have a question or encounter a problem feel free to contact me or post an issue on the github page.

## Contents
- [Rapid Prototyping System](#rapid-prototyping-system)
          - [by Thomas Verhappen](#by-thomas-verhappen)
  - [Contents](#contents)
- [Recommended System](#recommended-system)
  - [SvelteKit](#sveltekit)
    - [Getting Started](#getting-started)
      - [Installation](#installation)
      - [Setup](#setup)
      - [Official documentation](#official-documentation)
  - [SupaBase](#supabase)
    - [Getting Started](#getting-started-1)
      - [Installation](#installation-1)
      - [Setup](#setup-1)
      - [Official documentation](#official-documentation-1)
- [The Template](#the-template)
  - [Where to find the Template](#where-to-find-the-template)
  - [How to use the Template](#how-to-use-the-template)
    - [Getting Started](#getting-started-2)
      - [Installation](#installation-2)
      - [Setup](#setup-2)
  - [Tutorial](#tutorial)
    - [Step 1: Setup Environment](#step-1-setup-environment)
    - [Step 2: Create a New Project](#step-2-create-a-new-project)
    - [Step 3: Development Workflow](#step-3-development-workflow)
  - [FAQ](#faq)
  - [Additional Resources](#additional-resources)
  - [License](#license)
  - [Questionnaire](#questionnaire)

# Recommended System
The document below will consist of instructions as well as documentation on how to most effectively develop prototypes and products quickly using SvelteKit with SupaBase in conjunction with the Template provided.

__I recommend you read through the entire document before starting development and make bookmarks at bottlenecks in your development process.__

## SvelteKit
SvelteKit is a modern framework for building fast, interactive web applications with minimal configuration. It offers built-in routing, server-side rendering, and optimized bundling to streamline the development process. This section explains how to set up and leverage SvelteKit for efficient, rapid prototyping.

### Getting Started
To get started with SvelteKit we must first set-up the environment!

_if you are using the template you should disregard this section and follow [the template installation guide](#how-to-use-the-template) instead._

#### Installation

To create your project, run the following commands in your terminal:
```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

#### Setup

If you are using visual studio code downloading [the svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) will be helpful once you start coding.
Svelte extensions for other text editors exist too, you will just have to find them.

### Basic beginner guide

#### Projects

SvelteKit has many different types of projects.

- By default, SvelteKit will render the first page on server-side while any subsequent pages will be handled by the client.
- SvelteKit can also be used as a static site generator,
 this means the site will be fully prerendered using adapter-static. This allows for better preformance, especially when combined with tools especially design for static site generation.
- In SvelteKit, SPAs (Single Page Applications) exclusively use client-side rendering. 
  When building an SPA in SvelteKit you can write the backend in SvelteKit or another languages. (When using no backend, or a separate backend you can skip over any mention of server files)
- While SvelteKit usually isn't used to write traditional MPAs(Multi Page Applications), however setting csr = false allows you to remove all JavaScript on the page, or alternatively data-sveltekit-reload can be used to render specific links on the server.
- When using a backend written in a different language that SvelteKit it's recommended you deploy your frontend separately from it utilizing adapter-node or a serverless adapter. using a separate backend isn't mandatory but preformance can somewhat suffer from not using one.
- SvelteKit apps are simple to run on serverless platforms. The default zero config adapter will automatically run your app on a number of supported platforms or you can use adapter-vercel, adapter-netlify, or adapter-cloudflare to provide platform-specific configuration. And community adapters allow you to deploy your application to almost any serverless environment. Some of these adapters such as adapter-vercel and adapter-netlify offer an edge option, to support edge rendering for improved latency.
- You can deploy your SvelteKit project to your own server or VPS using adapter-node.
- You can use adapter-node to run your SvelteKit project within a container like docker or LXC.
- You can create a library of components or functions to use in another Svelte app with the @sveltejs/package add-on by choosing the library option when running sv create.
- SvelteKit has full suppport for service workers allowing you to build many types of applications such as offline apps and progressive web apps.
- You can turn a SvelteKit SPA into a mobile app with Tauri or Capacitor. Mobile features like the camera, geolocation, and push notifications are available via plugins for both platforms.
- You can turn a SvelteKit SPA into a desktop app with Tauri, Wails, or Electron.
- You can build browser extensions using either adapter-static or community adapters specifically tailored towards browser extensions.
- Because of its efficient rendering, Svelte can be run on low power devices.

#### Tree

Typically the structure of a project in SvelteKit looks like this:

```tree
my-project/
├ src/
│ ├ lib/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ ├ hooks.server.js
│ └ service-worker.js
├ static/
│ └ [your static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
```

Other common files can be found in the file structure when chosen after running npx sv create.

For more info on the file structure visit the [official documentation](https://svelte.dev/docs/kit/project-structure).

_[Playwright](https://playwright.dev/) is used for testing._

#### Web standards

##### Fetching APIs

SvelteKit uses `fetch` for getting data from the network. It’s available in hooks and server routes as well as in the browser.
[*](#added-info-on-fetch)

Besides `fetch` itself, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) includes the following interfaces:

- Request: An instance of Request is accessible in hooks and server routes as `event.request`. It contains useful methods like `request.json()` and `request.formData()` for getting data that was posted to an endpoint.
- Response: An instance of Response is returned from `await fetch(...)` and handlers in `+server.js` files. Fundamentally, a SvelteKit app is a machine for turning a `Request` into a `Response`.
- Headers: The `Headers` interface allows you to read incoming `request.headers` and set outgoing `response.headers`. [Example](#headers-example).

##### FormData

When dealing with HTML native form submissions you’ll be working with `FormData` objects.

```Typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.formData();

	// log all fields
	console.log([...body]);

	return json({
		// get a specific field's value
		name: body.get('name') ?? 'world'
	});
};
```

##### Stream APIs

Most of the time, your endpoints will return complete data, as in the `userAgent` example above. Sometimes, you may need to return a response that’s too large to fit in memory in one go, or is delivered in chunks, and for this the platform provides [streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) — [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) and [TransformStream](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

##### URL APIs

URLs are represented by the `URL` interface, which includes useful properties like `origin` and `pathname` (and, in the browser, `hash`). This interface shows up in various places — `event.url` in hooks and server routes, `page.url` in pages, `from` and `to` in `beforeNavigate` and `afterNavigate` and so on.

###### URLSearchParams

Wherever you encounter a URL, you can access query parameters via `url.searchparams`, which is an instance of `URLSearchParams`:

```Typescript 
const foo = url.searchParams.get('foo');
```

##### Web Crypto

The Web Crypto API is made available via the `crypto` global. It's used internally or Content Security Policy headers, but you can also use it for things like generating UUIDs.

```Typescript
const uuid = crypto.randomUUID();
```

#### Core concepts

[Routing](https://svelte.dev/docs/kit/routing)

[Loading data](https://svelte.dev/docs/kit/load)

[Form actions](https://svelte.dev/docs/kit/form-actions)

[Page options](https://svelte.dev/docs/kit/page-options)

[State management](https://svelte.dev/docs/kit/state-management)

#### Build and deploy

[Building your app](https://svelte.dev/docs/kit/building-your-app)

[Adapters](https://svelte.dev/docs/kit/adapters)

[Zero-config deployments](https://svelte.dev/docs/kit/adapter-auto)

[Node servers](https://svelte.dev/docs/kit/adapter-node)

[Static site generation](https://svelte.dev/docs/kit/adapter-static)

[Single page apps](https://svelte.dev/docs/kit/single-page-apps)

[Cloudflare pages](https://svelte.dev/docs/kit/adapter-cloudflare)

[Cloudflare workers](https://svelte.dev/docs/kit/adapter-cloudflare-workers)

[Netlify](https://svelte.dev/docs/kit/adapter-netlify)

[Vercel](https://svelte.dev/docs/kit/adapter-vercel)

[Writing adapters](https://svelte.dev/docs/kit/writing-adapters)

#### Advanced

[Advanced routing](https://svelte.dev/docs/kit/advanced-routing)

[Hooks](https://svelte.dev/docs/kit/hooks)

[Errors](https://svelte.dev/docs/kit/errors)

[Link options](https://svelte.dev/docs/kit/link-options)

[Service workers](https://svelte.dev/docs/kit/service-workers)

[Server-only modules](https://svelte.dev/docs/kit/server-only-modules)

[Snapshots](https://svelte.dev/docs/kit/snapshots)

[Shallow routing](https://svelte.dev/docs/kit/shallow-routing)

[Packaging](https://svelte.dev/docs/kit/packaging)

#### Best Practices

##### [Auth](https://svelte.dev/docs/kit/auth):

Auth refers to authentication and authorization, which are common needs when building a web application. Authentication means verifying that the user is who they say they are based on their provided credentials. Authorization means determining which actions they are allowed to take.

###### Sessions vs Tokens

After the user has provided their credentials such as a username and password, we want to allow them to use the application without needing to provide their credentials again for future requests. Users are commonly authenticated on subsequent requests with either a session identifier or signed token such as a JSON Web Token (JWT).

Session IDs are most commonly stored in a database. They can be immediately revoked, but require a database query to be made on each request.

In contrast, JWT generally are not checked against a datastore, which means they cannot be immediately revoked. The advantage of this method is improved latency and reduced load on your datastore.

###### Integration points

Auth cookies can be checked inside server hooks. If a user is found matching the provided credentials, the user information can be stored in `locals`.

###### Guides

[Lucia](https://lucia-auth.com/) is a good reference for session-based web app auth. It contains example code snippets and projects for implementing session-based auth within SvelteKit and other JS projects. You can add code which follows the Lucia guide to your project with `npx sv create` when creating a new project or `npx sv add lucia` for an existing project.

An auth system is tightly coupled to a web framework because most of the code lies in validating user input, handling errors, and directing users to the appropriate next page. As a result, many of the generic JS auth libraries include one or more web frameworks within them. For this reason, many users will find it preferrable to follow a SvelteKit-specific guide such as the examples found in Lucia rather than having multiple web frameworks inside their project.

##### [Performance](https://svelte.dev/docs/kit/performance):

Out of the box, SvelteKit does a lot of work to make your applications as performant as possible:

- Code-splitting, so that only the code you need for the current page is loaded.
- Asset preloading, so that ‘waterfalls’ (of files requesting other files) are prevented.
- File hashing, so that your assets can be cached forever.
- Request coalescing, so that data fetched from separate server `load` functions is grouped into a single HTTP request.
- Parallel loading, so that separate universal `load` functions fetch data simultaneously.
- Data inlining, so that requests made with `fetch` during server rendering can be replayed in.
- Conservative invalidation, so that `load` functions are only re-run when necessary.
- Prerendering (configurable on a per-route basis, if necessary) so that pages without dynamic data can be served instantaneously.
- Link preloading, so that data and code requirements for a client-side navigation are eagerly anticipated.

Nevertheless, we can’t (yet) eliminate all sources of slowness. To eke out maximum performance, you should be mindful of the following tips.

###### Diagnosing issues

Google’s [PageSpeed Insights](https://pagespeed.web.dev/) and (for more advanced analysis) WebPageTest are excellent ways to understand the performance characteristics of a site that is already deployed to the internet.

Your browser also includes useful developer tools for analysing your site, whether deployed or running locally:

- Chrome - [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview#devtools), [Network](https://developer.chrome.com/docs/devtools/network), and [Performance](https://developer.chrome.com/docs/devtools/performance) devtools.
- Edge - [Lighthouse](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/lighthouse/lighthouse-tool), [Network](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network/), and [Performance](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/evaluate-performance/) devtools.
- Firefox - [Network](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/) and [Performance](https://hacks.mozilla.org/2022/03/performance-tool-in-firefox-devtools-reloaded/) devtools.
- Safari - [enhancing the performance of your webpage](https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/Web_Inspector_Tutorial/EnhancingyourWebpagesPerformance/EnhancingyourWebpagesPerformance.html).

Note that your site running locally in `dev` mode will exhibit different behaviour than your production app, so you should do performance testing in [preview](https://svelte.dev/docs/kit/building-your-app#Preview-your-app) mode after building.

**Instrumenting**

If you see in the network tab of your browser that an API call is taking a long time and you’d like to understand why, you may consider instrumenting your backend with a tool like OpenTelemetry or Server-Timing headers.

###### Optimizing assets

- Images
Reducing the size of image files is often one of the most impactful changes you can make to a site’s performance. Svelte provides the `@sveltejs/enhanced-img` package, detailed on the images page, for making this easier. Additionally, Lighthouse is useful for identifying the worst offenders.

- Videos
Video files can be very large, so extra care should be taken to ensure that they’re optimized:
  - Compress videos with tools such as [Handbrake](https://handbrake.fr/). Consider converting the videos to web-friendly formats such as `.webm` or `.mp4`.
  - You can [lazy-load videos](https://web.dev/articles/lazy-loading-video) located below the fold with `preload="none"` (though note that this will slow down playback when the user does initiate it).
  - Strip the audio track out of muted videos using a tool like [FFmpeg](https://ffmpeg.org/).

- Fonts
SvelteKit automatically preloads critical `.js` and `.css` files
 when the user visits a page, but it does not preload fonts by default,
  since this may cause unnecessary files
   (such as font weights that are referenced by your CSS
    but not actually used on the current page)
     to be downloaded.
      Having said that,
       preloading fonts correctly
        can make a big difference to how fast your site feels.
         In your `handle` hook, you can call `resolve` with a `preload` filter that includes your fonts.
You can reduce the size of font files by [subsetting](https://web.dev/learn/performance/optimize-web-fonts#subset_your_web_fonts) your fonts.

###### Reducing code size

- Svelte version
We recommend running the latest version of Svelte. Svelte 5 is smaller and faster than Svelte 4, which is smaller and faster than Svelte 3.

- Packages
`rollup-plugin-visualizer` can be helpful for identifying which packages are contributing the most to the size of your site.
 You may also find opportunities to remove code by manually inspecting the build output (use build: `{ minify: false }` in your Vite config to make the output readable,
  but remember to undo that before deploying your app),
   or via the network tab of your browser’s devtools.

- External scripts
Try to minimize the number of third-party scripts running in the browser. For example, instead of using JavaScript-based analytics consider using server-side implementations, such as those offered by many platforms with SvelteKit adapters including [Cloudflare](https://www.cloudflare.com/en-gb/web-analytics/), [Netlify](https://docs.netlify.com/monitor-sites/site-analytics/), and [Vercel](https://vercel.com/docs/analytics).

To run third party scripts in a web worker (which avoids blocking the main thread), use [Partytown’s SvelteKit integration](https://partytown.qwik.dev/sveltekit/).

- Selective loading
Code imported with static `import` declarations will be automatically bundled with the rest of your page. If there is a piece of code you need only when some condition is met, use the dynamic `import(...)` form to selectively lazy-load the component.

###### Navigation

- Preloading
You can speed up client-side navigations by eagerly preloading the necessary code and data, using [link options](https://svelte.dev/docs/kit/link-options). This is configured by default on the `<body>` element when you create a new SvelteKit app.

- Non-essential data
For slow-loading data that isn’t needed immediately, the object returned from your `load` function can contain promises rather than the data itself. For server `load` functions, this will cause the data to stream in after the navigation (or initial page load).

- Preventing waterfalls
One of the biggest performance killers is what is referred to as a waterfall, which is a series of requests that is made sequentially. This can happen on the server or in the browser.

  - Asset waterfalls can occur in the browser when your HTML requests JS which requests CSS which requests a background image and web font. SvelteKit will largely solve this class of problems for you by adding `modulepreload` tags or headers, but you should view the network tab in your devtools to check whether additional resources need to be preloaded. Pay special attention to this if you use web fonts since they need to be handled manually.

  - If a universal `load` function makes an API call to fetch the current user, then uses the details from that response to fetch a list of saved items, and then uses that response to fetch the details for each item, the browser will end up making multiple sequential requests. This is deadly for performance, especially for users that are physically located far from your backend. Avoid this issue by using server `load` functions where possible.
  
  - Server `load` functions are also not immune to waterfalls (though they are much less costly since they rarely involve roundtrips with high latency). For example if you query a database to get the current user and then use that data to make a second query for a list of saved items, it will typically be more performant to issue a single query with a database join.

###### Hosting

Your frontend should be located in the same data center as your backend to minimize latency. For sites with no central backend, many SvelteKit adapters support deploying to the edge, which means handling each user’s requests from a nearby server. This can reduce load times significantly. Some adapters even support configuring deployment on a per-route basis. You should also consider serving images from a CDN (which are typically edge networks) — the hosts for many SvelteKit adapters will do this automatically.

Ensure your host uses HTTP/2 or newer. Vite’s code splitting creates numerous small files for improved cacheability, which results in excellent performance, but this does assume that your files can be loaded in parallel with HTTP/2.

###### Further reading

For the most part, building a performant SvelteKit app is the same as building any performant web app. You should be able to apply information from general performance resources such as Core Web Vitals to any web experience you build.

##### [Images](https://svelte.dev/docs/kit/images)

Visit the [documentation](https://svelte.dev/docs/kit/images) about Images for more info.

##### [Accessibility](https://svelte.dev/docs/kit/accessibility)

SvelteKit strives to provide an accessible platform for your app by default. Svelte’s compile-time accessibility checks will also apply to any SvelteKit application you build.

Here’s how SvelteKit’s built-in accessibility features work and what you need to do to help these features to work as well as possible. Keep in mind that while SvelteKit provides an accessible foundation, you are still responsible for making sure your application code is accessible. If you’re new to accessibility, see the “further reading” section of this guide for additional resources.

Consult the [official documentation](https://svelte.dev/docs/kit/accessibility) for further information.

##### [SEO (Search engine optimization)](https://svelte.dev/docs/kit/seo)

The most important aspect of SEO is to create high-quality content that is widely linked to from around the web. However, there are a few technical considerations for building sites that rank well. Consult the [official documentation](https://svelte.dev/docs/kit/seo) for more info on this.

#### Official documentation

[Introduction to SvelteKit](https://svelte.dev/docs/kit/introduction)
[Introduction to Svelte](https://svelte.dev/docs/svelte/overview)

#### Extras

##### Added info on fetch

A special version of `fetch` is available in `load` functions, server hooks and API routes for invoking endpoints directly during server-side rendering, without making an HTTP call, while preserving credentials. (To make credentialled fetches in server-side code outside `load`, you must explicitly pass `cookie` and/or `authorization` headers.) It also allows you to make relative requests, whereas server-side `fetch` normally requires a fully qualified URL.

##### Headers example

```Typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request }) => {
	// log all headers
	console.log(...request.headers);

	// create a JSON Response using a header we received
	return json({ 
		// retrieve a specific header
		userAgent: request.headers.get('user-agent')
	}, {
		// set a header on the response
		headers: { 'x-custom-header': 'potato' }
	});
};
```

## SupaBase
SupaBase is an open‐source backend‐as‐a‐service platform offering real-time databases, authentication, storage, edge functions, AI & vectors, cron jobs, queues, and Svelte integration. It simplifies backend integration, allowing you to quickly add scalable, secure services to your projects. This section explains how to set up and leverage SupaBase for efficient, rapid prototyping.

### Getting Started
Before integrating SupaBase into your project, create an account on the SupaBase dashboard and set up a new project. Once your project is created, you'll receive a unique project URL and an API key, which are required to initialize the SupaBase client. These credentials allow your application to securely communicate with your backend services.

_if you are using the template you should disregard this section and follow [the template installation guide](#how-to-use-the-template) instead._

#### Installation
Add the SupaBase client library to your project by running:
```bash
npm install @supabase/supabase-js
```

#### Setup
After installing the client, initialize SupaBase in your application by creating a file (for example, `supabaseClient.js`) with the following code:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseKey = 'your-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);
```
Replace `'https://your-project-ref.supabase.co'` and `'your-anon-key'` with your actual project credentials from the SupaBase dashboard.

---

#### Basic Tutorials

Below are basic tutorials covering the core features of SupaBase:

##### Database
1. **Create a Table:**  
   In your SupaBase dashboard, navigate to the Table Editor and create a new table (e.g., `profiles`) with fields such as:
   - `id` (UUID, primary key)
   - `username` (text)
   - `email` (text)

2. **Insert Data:**  
   Insert a new record using:
   ```javascript
   const { data, error } = await supabase
     .from('profiles')
     .insert([{ username: 'john_doe', email: 'john@example.com' }]);

   if (error) {
     console.error('Error inserting data:', error);
   } else {
     console.log('Inserted data:', data);
   }
   ```

3. **Retrieve Data:**  
   Fetch records with:
   ```javascript
   const { data, error } = await supabase
     .from('profiles')
     .select('*');

   if (error) {
     console.error('Error fetching data:', error);
   } else {
     console.log('Fetched data:', data);
   }
   ```

##### Auth
1. **Sign Up a User:**  
   Register a new user with:
   ```javascript
   const { data, error } = await supabase.auth.signUp({
     email: 'user@example.com',
     password: 'password'
   });

   if (error) {
     console.error('Error signing up:', error);
   } else {
     console.log('Sign up successful:', data);
   }
   ```

2. **Sign In a User:**  
   Log in an existing user with:
   ```javascript
   const { data, error } = await supabase.auth.signInWithPassword({
     email: 'user@example.com',
     password: 'password'
   });

   if (error) {
     console.error('Error signing in:', error);
   } else {
     console.log('Sign in successful:', data);
   }
   ```

##### Storage
1. **Upload a File:**  
   Upload a file to a storage bucket (e.g., `avatars`):
   ```javascript
   const fileInput = document.querySelector('#file-input');
   const file = fileInput.files[0];

   const { data, error } = await supabase
     .storage
     .from('avatars')
     .upload('public/avatar1.png', file);

   if (error) {
     console.error('Error uploading file:', error);
   } else {
     console.log('File uploaded:', data);
   }
   ```

2. **Download a File:**  
   Retrieve a public URL for a stored file:
   ```javascript
   const { data, error } = supabase
     .storage
     .from('avatars')
     .getPublicUrl('public/avatar1.png');

   if (error) {
     console.error('Error getting file URL:', error);
   } else {
     console.log('File URL:', data.publicUrl);
   }
   ```

##### Realtime
Subscribe to changes in a table to receive updates in real time:
```javascript
const subscription = supabase
  .from('profiles')
  .on('INSERT', payload => {
    console.log('New profile added:', payload);
  })
  .subscribe();
```
This code listens for new records in the `profiles` table and logs them as they’re inserted.

##### Edge Functions
1. **Create an Edge Function:**  
   Write an edge function (using Deno) and deploy it via the SupaBase CLI.

2. **Call an Edge Function:**  
   Invoke the function from your client:
   ```javascript
   const response = await fetch('https://your-project-ref.functions.supabase.co/hello', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: 'Hello, Edge!' })
   });
   const result = await response.json();
   console.log('Edge function result:', result);
   ```

##### AI & Vectors
Utilize SupaBase’s support for AI and vector operations (assuming the use of a stored procedure like `match_vectors`):
```javascript
const { data, error } = await supabase.rpc('match_vectors', {
  query_vector: [/* your vector values */],
  similarity_threshold: 0.8,
  match_count: 5
});

if (error) {
  console.error('Error performing vector search:', error);
} else {
  console.log('Vector search results:', data);
}
```
This example calls a stored procedure to perform a vector similarity search.

##### Cron Jobs
Schedule automated tasks using SupaBase’s cron functionality:
1. **Setup a Cron Job:**  
   Configure a cron job in the SupaBase dashboard to trigger a function or RPC at scheduled intervals.

2. **Example Task:**  
   Write a function that performs routine cleanup, then schedule it to run daily:
   ```javascript
   async function cleanupOldRecords() {
     const { data, error } = await supabase
       .from('logs')
       .delete()
       .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

     if (error) {
       console.error('Error cleaning up records:', error);
     } else {
       console.log('Old records cleaned up:', data);
     }
   }
   ```
   
##### Queues
Implement a basic queue mechanism using database tables:
1. **Setup a Queue Table:**  
   Create a table (e.g., `job_queue`) with fields such as:
   - `id` (UUID, primary key)
   - `task` (text)
   - `status` (text)

2. **Add a Job to the Queue:**  
   Insert a new job:
   ```javascript
   const { data, error } = await supabase
     .from('job_queue')
     .insert([{ task: 'process_data', status: 'pending' }]);

   if (error) {
     console.error('Error adding job:', error);
   } else {
     console.log('Job added:', data);
   }
   ```

3. **Process Jobs:**  
   Periodically poll the `job_queue` table for pending jobs and update their status as you process them.

##### Svelte Integration
Integrate SupaBase within a SvelteKit application:
1. **Import the Client:**  
   In your Svelte component, import the SupaBase client:
   ```svelte
   <script>
     import { supabase } from './supabaseClient.js';
     import { onMount } from 'svelte';

     let profiles = [];

     onMount(async () => {
       const { data, error } = await supabase
         .from('profiles')
         .select('*');

       if (error) {
         console.error('Error loading profiles:', error);
       } else {
         profiles = data;
       }
     });
   </script>

   <h1>User Profiles</h1>
   <ul>
     {#each profiles as profile}
       <li>{profile.username} - {profile.email}</li>
     {/each}
   </ul>
   ```
This basic integration demonstrates how to fetch and display data from SupaBase in a Svelte component.

---

#### Official Documentation
For more detailed guidance and advanced configurations on any of these features, please refer to the [SupaBase official documentation](https://supabase.com/docs).



# The Template

This template serves as a starting point for rapid prototyping with SvelteKit and SupaBase. It is designed to help you quickly build fully functional prototypes with built-in authentication, CRUD operations, and a suite of reusable UI components. The template includes a working password reset flow and a comprehensive test page to demonstrate its features.

## Where to find the Template

The template source code is available on GitHub. You can clone it with:

```bash
git clone https://github.com/yourusername/your-template-repo.git
```

Alternatively, download the ZIP from the repository’s releases page. The code is structured for quick customization and easy integration into your workflow.

## How to use the Template

The template is built with SvelteKit and integrates SupaBase for backend services. It provides a full set of auto‑CRUD functions (for data, table, and auth operations) along with a suite of UI components (Form, Input, Button, Card, etc.) that can be used directly or extended as needed.

### Getting Started

#### Installation

After cloning the repository, navigate into the project directory and install the dependencies:

```bash
npm install
```

#### Setup

1. **Environment Variables:**  
   Create a `.env` file at the project root with the following keys:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   Replace the placeholder values with your actual SupaBase credentials.

2. **Password Reset Configuration:**  
   The template includes a password reset page at `/reset-password`. Configure your SupaBase password reset redirect URL to point to this page (e.g., `http://localhost:5173/reset-password`). The page parses recovery tokens from the URL and allows users to set a new password.

3. **Run the Development Server:**  
   Start your development server with:
   ```bash
   npm run dev
   ```
   Your application will run at `http://localhost:5173`.

## Tutorial

This tutorial walks you through using and extending the template for your projects.

### Step 1: Setup Environment

- Configure your environment variables in `.env` as described above.
- Ensure your SupaBase project has authentication enabled and that you’ve set the proper redirect URL for password resets.

### Step 2: Create a New Project

- Clone the template repository.
- Rename the project folder and update project details (e.g., package name in `package.json`).
- Customize the auto‑CRUD functions and UI components to match your desired features.

### Step 3: Development Workflow

- **Authentication:**  
  Use the provided auth functions (register, login, logout, password reset) and pages to manage user sessions. The password reset page handles recovery tokens and allows users to update their password.

- **CRUD Operations:**  
  The template includes functions to create, read, update, and delete records. A comprehensive test page demonstrates these functions using interactive buttons.

- **UI Components:**  
  Leverage the prebuilt components (Form, Input, Button, Card, etc.) to rapidly build your user interface. Customize them as needed for your project’s look and feel.

- **Testing:**  
  The template comes with a test page (`test.svelte`) where you can trigger each operation one by one, making it easy to verify functionality as you extend your prototype.

## FAQ

**Q: How do I update the password reset flow?**  
A: The template includes a password reset page at `/reset-password`. In SupaBase, set the redirect URL to point to this page. The page then parses tokens from the URL and uses `supabase.auth.updateUser` to update the password.

**Q: Can I use this template for production?**  
A: Yes. While the template is optimized for rapid prototyping, you should review and secure authentication and database operations before moving to production.

**Q: How do I add new features?**  
A: The template is modular. Add new components or functions as needed, and integrate them into the provided structure. Refer to the SvelteKit and SupaBase documentation for best practices.

## Additional Resources

- [SvelteKit Documentation](https://svelte.dev/docs/kit/introduction)
- [Supabase Documentation](https://supabase.com/docs)
- [Password Reset Tutorial](https://supabase.com/docs/guides/auth/auth-email-password#resetting-passwords)
- [Svelte Official Documentation](https://svelte.dev/)

## License

This template is distributed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Questionnaire

- [ ] **Where will your data live?**  
  (Keep your data on your own computer / Use an online service)

- [ ] **Will people need to sign in?**  
  (Yes, I need a login system / No, it's open access)

- [ ] **Do you want smart features?**  
  (Yes, include advanced or automated features / No, keep it simple)

- [ ] **How are you working?**  
  (By myself / With a group)

- [ ] **Should it be online?**  
  (Yes, it should be accessible on the internet / No, it will remain local)