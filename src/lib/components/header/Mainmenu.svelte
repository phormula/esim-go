<script lang="ts">
  import { page } from '$app/stores';
  import { Nav, NavItem } from '@sveltestrap/sveltestrap';
</script>

<div class="mx-auto">
  <Nav justified navbar>
    <NavItem>
      <a href="/" class="nav-link text-nowrap" class:active={$page.url.pathname === '/'}>Home</a>
    </NavItem>
    <NavItem>
      <a href="/about" class="nav-link" class:active={$page.url.pathname.includes('/about')}>
        About Us
      </a>
    </NavItem>
    <NavItem>
      <a href="/contact" class="nav-link" class:active={$page.url.pathname.includes('/contact')}>
        Contact Us
      </a>
    </NavItem>
  </Nav>
</div>

<style>
  .nav-link {
    white-space: nowrap;
  }
</style>
