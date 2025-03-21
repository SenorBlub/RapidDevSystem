<script lang="ts">
    import { onMount } from 'svelte';
    import PageLayout from '../layouts/pageLayout.svelte';
    import HeaderOverlay from '../layouts/overlays/headerOverlay.svelte';
    import SidebarOverlay from '../layouts/overlays/sidebarOverlay.svelte';
    import FooterOverlay from '../layouts/overlays/footerOverlay.svelte';
    import Alert from '../components/alert.svelte';
    import Button from '../components/button.svelte';
    import Card from '../components/card.svelte';
    import Form from '../components/form.svelte';
    import Input from '../components/input.svelte';
    import List from '../components/list.svelte';
    import Modal from '../components/modal.svelte';
    import Notification from '../components/notification.svelte';
    import Dropdown from '../components/dropdown.svelte';
    import Tooltip from '../components/tooltip.svelte';
    import Loader from '../components/spinner.svelte';
    import Breadcrumb from '../components/breadcrumb.svelte';
  
    // Import auto‑CRUD functions (data, table, and auth)
    import {
      createRecord,
      getRecord,
      getAllRecords,
      updateRecord,
      deleteRecord,
      createRecords,
      getRecordsByIds,
      updateRecords,
      deleteRecords,
      createTable,
      updateTable,
      deleteTable,
      registerUser,
      loginUser,
      logoutUser,
      getCurrentUser,
      resetPassword,
      verifySession
    } from '../functions/auto-crud';
  
    // --- Local State ---
    let showNotification = true;
    let modalOpen = false; // For Modal component in extra tests
  
    // Auth form state
    let authEmail = '';
    let authPassword = '';
    let authError = '';
    let authMessage = '';
    let currentUser: any = null;
  
    // Data upload state
    let uploadTable = '';
    let uploadJson = '';
    let uploadResult = '';
  
    // Test output for CRUD and additional tests
    let testOutput = '';
  
    // --- Functions ---
  
    // Auth: Login
    async function handleLogin(event: Event) {
      authError = '';
      try {
        const result = await loginUser(authEmail, authPassword);
        currentUser = result.user;
        authMessage = 'Logged in successfully';
      } catch (err: any) {
        authError = err.message || JSON.stringify(err);
      }
    }
  
    // Auth: Logout
    async function handleLogout() {
      try {
        await logoutUser();
        currentUser = null;
        authMessage = 'Logged out successfully';
      } catch (err: any) {
        authError = err.message || JSON.stringify(err);
      }
    }
  
    // Auth: Register
    async function handleRegister(event: Event) {
      authError = '';
      try {
        const result = await registerUser(authEmail, authPassword);
        authMessage = 'Registered successfully. Check your email for confirmation or log in.';
      } catch (err: any) {
        authError = err.message || JSON.stringify(err);
      }
    }
  
    // Auth: Reset Password
    async function handleResetPassword(event: Event) {
      authError = '';
      try {
        const message = await resetPassword(authEmail);
        authMessage = message;
      } catch (err: any) {
        authError = err.message || JSON.stringify(err);
      }
    }
  
    // Single-Record CRUD Tests on "test_table"
    async function runSingleCrudTests() {
      testOutput += "\n--- Single-Record CRUD Tests ---\n";
      try {
        const newRecord = await createRecord('test_table', { name: 'Test Record', value: 100 });
        testOutput += `Created: ${JSON.stringify(newRecord)}\n`;
        const readRecord = await getRecord('test_table', newRecord.id);
        testOutput += `Read: ${JSON.stringify(readRecord)}\n`;
        const updatedRecord = await updateRecord('test_table', newRecord.id, { value: 200 });
        testOutput += `Updated: ${JSON.stringify(updatedRecord)}\n`;
        await deleteRecord('test_table', newRecord.id);
        testOutput += `Deleted record with id: ${newRecord.id}\n`;
      } catch (err: any) {
        testOutput += `Single-Record CRUD Test Error: ${err.message || JSON.stringify(err)}\n`;
      }
    }
  
    // Multi-Record CRUD Tests using "test_multi" table
    async function runMultiCrudTests() {
      testOutput += "\n--- Multi-Record CRUD Tests ---\n";
      try {
        await createTable("test_multi", { name: "sample", value: 1 });
        testOutput += "Created table 'test_multi'\n";
        const records = await createRecords("test_multi", [
          { name: "Alice", value: 10 },
          { name: "Bob", value: 20 }
        ]);
        testOutput += `Created records: ${JSON.stringify(records)}\n`;
        const ids = records.map(r => r.id);
        const fetched = await getRecordsByIds("test_multi", ids);
        testOutput += `Fetched records by IDs: ${JSON.stringify(fetched)}\n`;
        const updates = records.map(record => ({ id: record.id, data: { value: record.value + 5 } }));
        const updated = await updateRecords("test_multi", updates);
        testOutput += `Updated records: ${JSON.stringify(updated)}\n`;
        await deleteRecords("test_multi", ids);
        testOutput += `Deleted records with IDs: ${JSON.stringify(ids)}\n`;
        await deleteTable("test_multi");
        testOutput += "Deleted table 'test_multi'\n";
      } catch (err: any) {
        testOutput += `Multi-Record CRUD Test Error: ${err.message || JSON.stringify(err)}\n`;
      }
    }
  
    // Table Operations Tests using "test_table_ops"
    async function runTableTests() {
      testOutput += "\n--- Table Operations Tests ---\n";
      try {
        await createTable("test_table_ops", { title: "Test", count: 0 });
        testOutput += "Created table 'test_table_ops'\n";
        await updateTable("test_table_ops", "ADD COLUMN description TEXT");
        testOutput += "Updated table 'test_table_ops' (added column description)\n";
        await deleteTable("test_table_ops");
        testOutput += "Deleted table 'test_table_ops'\n";
      } catch (err: any) {
        testOutput += `Table Operations Test Error: ${err.message || JSON.stringify(err)}\n`;
      }
    }
  
    // Additional Tests: getAllRecords and verifySession
    async function runAdditionalTests() {
      testOutput += "\n--- Additional Tests ---\n";
      try {
        await createTable("test_getAll", { item: "value" });
        const recs = await createRecords("test_getAll", [{ item: "A" }, { item: "B" }]);
        testOutput += `Created records in test_getAll: ${JSON.stringify(recs)}\n`;
        const allRecs = await getAllRecords("test_getAll");
        testOutput += `getAllRecords: ${JSON.stringify(allRecs)}\n`;
        const session = await verifySession();
        testOutput += `verifySession: ${JSON.stringify(session)}\n`;
        await deleteTable("test_getAll");
        testOutput += "Deleted table 'test_getAll'\n";
      } catch (err: any) {
        testOutput += `Additional Test Error: ${err.message || JSON.stringify(err)}\n`;
      }
    }
  
    // Data Upload: Insert data via createRecord
    async function handleUpload(event: Event) {
      uploadResult = '';
      let dataObj;
      try {
        dataObj = JSON.parse(uploadJson);
      } catch (err) {
        uploadResult = 'Invalid JSON';
        return;
      }
      try {
        const newRecord = await createRecord(uploadTable, dataObj);
        uploadResult = JSON.stringify(newRecord, null, 2);
      } catch (err: any) {
        uploadResult = 'Upload Error: ' + (err.message || JSON.stringify(err));
      }
    }
  
    // Clear the test output
    function clearTests() {
      testOutput = '';
    }
  
    // On mount, only fetch the current user.
    onMount(async () => {
      try {
        currentUser = await getCurrentUser();
      } catch (err) {
        // Not logged in.
      }
    });
  </script>
  
  <PageLayout>
    <!-- HEADER -->
    <div slot="header" class="w-full bg-gray-200 text-gray-800">
      <HeaderOverlay>
        <h1 class="text-3xl font-bold">Test Page</h1>
        <p class="mt-2 text-lg">Welcome back, User!</p>
      </HeaderOverlay>
    </div>
  
    <!-- SIDEBAR -->
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
  
    <!-- FOOTER -->
    <div slot="footer" class="bg-gray-300 text-gray-800">
      <FooterOverlay>
        <p class="text-center text-sm">&copy; 2025 My Dashboard App</p>
      </FooterOverlay>
    </div>
  
    <!-- MAIN CONTENT -->
    <div class="bg-white p-6">
      <Breadcrumb>
        <li class="breadcrumb-item">
          <a href="/" class="text-blue-600 hover:underline">Home</a>
        </li>
        <li class="breadcrumb-separator">/</li>
        <li class="breadcrumb-item text-gray-500">Dashboard</li>
      </Breadcrumb>
  
      <Notification type="success" isVisible={showNotification}>
        <p>Welcome to your dashboard! Everything is running smoothly.</p>
      </Notification>
  
      <Alert type="warning">
        <p>Your profile is incomplete. Please update your info.</p>
      </Alert>
  
      <!-- Test Buttons for Running Each Test -->
      <Card>
        <div slot="header">
          <h3 class="text-xl font-bold">Test Controls</h3>
        </div>
        <div class="space-y-2">
          <Button on:click={clearTests} variant="secondary">Clear Test Output</Button>
          <!-- Note: Use the onSubmit prop for the Form component -->
          <Button on:click={runSingleCrudTests} variant="primary">Run Single-Record CRUD Tests</Button>
          <Button on:click={runMultiCrudTests} variant="primary">Run Multi-Record CRUD Tests</Button>
          <Button on:click={runTableTests} variant="primary">Run Table Operations Tests</Button>
          <Button on:click={runAdditionalTests} variant="primary">Run Additional Tests</Button>
        </div>
      </Card>
  
      <!-- CRUD Test Output -->
      <Card>
        <div slot="header">
          <h3 class="text-xl font-bold">CRUD Test Output</h3>
        </div>
        <pre class="font-mono text-sm whitespace-pre-wrap">{testOutput}</pre>
      </Card>
  
      <!-- Auth & Data Upload Section -->
      <div class="my-6 rounded border border-gray-200 bg-gray-50 p-4">
        <h2 class="mb-4 text-2xl font-bold">Auth & Data Upload Test</h2>
  
        <!-- Registration -->
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Register (Component)</h3>
          </div>
          <Form onSubmit={handleRegister}>
            <div class="mb-4">
              <Input id="regEmail" type="email" bind:value={authEmail} placeholder="Email" />
            </div>
            <div class="mb-4">
              <Input id="regPassword" type="password" bind:value={authPassword} placeholder="Password" />
            </div>
            <Button type="submit" variant="primary">Register</Button>
          </Form>
        </Card>
  
        <!-- Login / User Info -->
        {#if !currentUser}
          <Card>
            <div slot="header">
              <h3 class="text-xl font-bold">Login (Component)</h3>
            </div>
            <Form onSubmit={handleLogin}>
              <div class="mb-4">
                <Input id="authEmail" type="email" bind:value={authEmail} placeholder="Email" />
              </div>
              <div class="mb-4">
                <Input id="authPassword" type="password" bind:value={authPassword} placeholder="Password" />
              </div>
              <Button type="submit" variant="primary">Login</Button>
            </Form>
            {#if authError}
              <Alert type="error"><p>{authError}</p></Alert>
            {/if}
          </Card>
        {:else}
          <Card>
            <div slot="header">
              <h3 class="text-xl font-bold">User Info</h3>
            </div>
            <p>Logged in as: {currentUser.email}</p>
            <Button on:click={handleLogout} variant="secondary">Logout</Button>
            {#if authMessage}
              <Notification type="info" isVisible={true}><p>{authMessage}</p></Notification>
            {/if}
          </Card>
        {/if}
  
        <!-- Reset Password Test -->
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Reset Password</h3>
          </div>
          <Form onSubmit={handleResetPassword}>
            <div class="mb-4">
              <Input id="resetEmail" type="email" bind:value={authEmail} placeholder="Email" />
            </div>
            <Button type="submit" variant="primary">Reset Password</Button>
          </Form>
        </Card>
  
        <hr class="my-4" />
  
        <!-- Data Upload -->
        <Card>
          <div slot="header">
            <h3 class="text-xl font-bold">Upload Data (Component)</h3>
          </div>
          <Form onSubmit={handleUpload}>
            <div class="mb-4">
              <Input id="uploadTable" type="text" bind:value={uploadTable} placeholder="Table Name (e.g. dynamic_table)" />
            </div>
            <div class="mb-4">
              <Input id="uploadJson" type="textarea" bind:value={uploadJson} placeholder={`JSON Data (e.g. {"name": "John Doe", "age": 30})`} />
            </div>
            <Button type="submit" variant="primary">Upload Data</Button>
          </Form>
          {#if uploadResult}
            <Card>
              <div slot="header">
                <h3 class="text-xl font-bold">Upload Response</h3>
              </div>
              <pre class="font-mono text-sm whitespace-pre-wrap">{uploadResult}</pre>
            </Card>
          {/if}
        </Card>
      </div>
  
      <!-- Extra Component Tests -->
      <Card>
        <div slot="header">
          <h3 class="text-xl font-bold">Extra Component Tests</h3>
        </div>
        <div class="space-y-4">
          <!-- Dropdown -->
          <Dropdown>
            <div slot="trigger">
              <Button variant="primary">Options</Button>
            </div>
            <ul>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100">Option 1</li>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100">Option 2</li>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100">Option 3</li>
            </ul>
          </Dropdown>
  
          <!-- Tooltip -->
          <Tooltip text="This is a tooltip">
            <span class="cursor-pointer underline">Hover over me</span>
          </Tooltip>
  
          <!-- Modal -->
          <Button on:click={() => modalOpen = true} variant="primary">Open Modal</Button>
          <Modal bind:isOpen={modalOpen}>
            <div slot="header">
              <h3 class="text-xl font-bold">Modal Title</h3>
            </div>
            <p>This is a modal test.</p>
            <div slot="footer">
              <Button on:click={() => modalOpen = false} variant="secondary">Close Modal</Button>
            </div>
          </Modal>
  
          <!-- Loader -->
          <Loader size="50px" />
  
          <!-- List -->
          <List>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </List>
        </div>
      </Card>
    </div>
  </PageLayout>
  
  <style>
    .breadcrumb-item + .breadcrumb-separator {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  </style>
  