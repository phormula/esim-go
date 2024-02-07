<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Offcanvas
  } from '@sveltestrap/sveltestrap';
  import MainMenu from '$lib/components/header/Mainmenu.svelte';
  import { navigating } from '$app/stores';

  let isOpen = false;

  let isFullSearch = false;

  let topOpen = false;
  const toggle = () => (isOpen = !isOpen);

  function handleUpdate(event: any) {
    isOpen = event.detail.isOpen;
  }

  $: {
    isFullSearch = topOpen;

    if ($navigating) isOpen = false;
  }
</script>

<Navbar color="dark" dark expand="md" container class="nav-bg">
  <NavbarBrand href="/">Logo</NavbarBrand>
  <Collapse navbar expand="md" on:update={handleUpdate}><MainMenu /></Collapse>
  <Offcanvas {isOpen} {toggle}>
    <h1 slot="header">Main Menu</h1>
    <MainMenu />
  </Offcanvas>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
</Navbar>
