<script lang="ts">
    import PageLayout from "../layouts/pageLayout.svelte";
    import HeaderOverlay from "../layouts/overlays/headerOverlay.svelte";
    import SidebarOverlay from "../layouts/overlays/sidebarOverlay.svelte";
    import FooterOverlay from "../layouts/overlays/footerOverlay.svelte";
    import Alert from "../components/alert.svelte";
    import Button from "../components/button.svelte";
    import Card from "../components/card.svelte";
    import Form from "../components/form.svelte";
    import Input from "../components/input.svelte";
    import List from "../components/list.svelte";
    import Modal from "../components/modal.svelte";
    import Notification from "../components/notification.svelte";
    import Dropdown from "../components/dropdown.svelte";
    import Tooltip from "../components/tooltip.svelte";
    import Loader from "../components/spinner.svelte";
    import Breadcrumb from "../components/breadcrumb.svelte";
    
    let showModal = false;
    let showNotification = true;
  </script>
  
  <PageLayout>
    <!-- HEADER SLOT -->
    <div slot="header" class="bg-gray-200 text-gray-800 w-full">
      <HeaderOverlay>
        <h1 class="text-3xl font-bold">Test Page</h1>
        <p class="mt-2 text-lg">Welcome back, User!</p>
      </HeaderOverlay>
    </div>
  
    <!-- SIDEBAR SLOT -->
    <div slot="sidebar" class="bg-gray-100 text-gray-800">
      <SidebarOverlay>
        <nav class="space-y-2">
          <a href="/dashboard" class="block text-blue-600 hover:underline">Dashboard</a>
          <a href="/profile" class="block text-blue-600 hover:underline">Profile</a>
          <a href="/reports" class="block text-blue-600 hover:underline">Reports</a>
          <a href="/settings" class="block text-blue-600 hover:underline">Settings</a>
        </nav>
      </SidebarOverlay>
    </div>
  
    <!-- FOOTER SLOT -->
    <div slot="footer" class="bg-gray-300 text-gray-800">
      <FooterOverlay>
        <p class="text-sm text-center">&copy; 2025 My Dashboard App</p>
      </FooterOverlay>
    </div>
  
    <!-- MAIN CONTENT (DEFAULT SLOT) -->
    <div class="p-6 bg-white">
      <!-- Breadcrumb -->
      <Breadcrumb>
        <li class="breadcrumb-item">
          <a href="/" class="text-blue-600 hover:underline">Home</a>
        </li>
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item text-gray-500">Dashboard</li>
      </Breadcrumb>
  
      <!-- Notification Banner -->
      <Notification type="success" isVisible={showNotification}>
        <p>Welcome to your dashboard! Everything is running smoothly.</p>
      </Notification>
  
      <!-- Alert Message -->
      <Alert type="warning">
        <p>Your profile is incomplete. Please update your info to get the most out of your account.</p>
      </Alert>
  
      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Card One</h3>
          </div>
          <p>This card displays some key information.</p>
          <div slot="footer">
            <small>Updated just now</small>
          </div>
        </Card>
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Card Two</h3>
          </div>
          <p>This card shows additional details.</p>
          <div slot="footer">
            <small>Updated 5 minutes ago</small>
          </div>
        </Card>
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Card Three</h3>
          </div>
          <p>This card highlights important metrics.</p>
          <div slot="footer">
            <small>Updated 10 minutes ago</small>
          </div>
        </Card>
      </div>
  
      <!-- Profile Update Form -->
      <div class="my-6">
        <h2 class="text-2xl font-bold mb-4">Update Your Profile</h2>
        <Form on:submit={(e) => console.log("Form submitted", e)}>
          <div class="mb-4">
            <Input id="username" placeholder="Username" />
          </div>
          <div class="mb-4">
            <Input id="email" type="email" placeholder="Email address" />
          </div>
          <Button type="submit" variant="primary">Save Changes</Button>
        </Form>
      </div>
  
      <!-- Recent Activities List -->
      <div class="my-6">
        <h2 class="text-2xl font-bold mb-4">Recent Activities</h2>
        <List>
          <li>Logged in from IP 192.168.0.1</li>
          <li>Updated profile information</li>
          <li>Downloaded monthly report</li>
        </List>
      </div>
  
      <!-- Dropdown & Tooltip Section -->
      <div class="my-6 flex items-center space-x-4">
        <Dropdown>
          <div slot="trigger">
            <Button variant="secondary">Sort Options</Button>
          </div>
          <ul>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sort by Date</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sort by Name</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sort by Status</li>
          </ul>
        </Dropdown>
        <Tooltip text="Learn more about sorting options">
          <span class="underline cursor-pointer">Learn More</span>
        </Tooltip>
      </div>
  
      <!-- Loader Section -->
      <div class="my-6">
        <h2 class="text-2xl font-bold mb-4">Loading Data...</h2>
        <Loader size="50px" color="#3b82f6" />
      </div>
  
      <!-- Modal Trigger -->
      <button on:click={() => (showModal = true)}>Open Modal</button>

      <Modal bind:isOpen={showModal}>
        <div slot="header">
          <h3 class="text-xl font-bold">My Modal</h3>
        </div>
        <p>Some detailed information here.</p>
        <div slot="footer">
          <button on:click={() => (showModal = false)}>Close</button>
        </div>
      </Modal>
    </div>
  </PageLayout>
  
  <style>
    .breadcrumb-item + .breadcrumb-separator {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  </style>
  