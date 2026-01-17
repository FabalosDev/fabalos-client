<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // 🛡️ SYSTEM INTEGRATION
  $: supabase = $page.data.supabase;

  // ⚙️ STATE MANAGEMENT
  let step: 'email' | 'verify' = 'email'; // Controls the UI state
  let email = '';
  let token = ''; // Stores the 6-digit code
  let loading = false;
  let message = '';

// 📡 PHASE 1: DISPATCH CODE (PATCHED FOR HYBRID AUTH)
  async function sendCode() {
    loading = true;
    message = '';

    if (!supabase) {
      message = 'SYSTEM_ERROR: Auth client unreachable.';
      loading = false;
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
// 👇 CHANGE TO THIS:
options: {
  shouldCreateUser: true, // ✅ Allows new users to be created automatically
  emailRedirectTo: `${window.location.origin}/auth/callback`
}
    });

    if (error) {
      message = `ERROR_LOG: ${error.message}`;
    } else {
      // ✅ SUCCESS: Switch UI to Verify Mode
      step = 'verify';
      message = 'SIGNAL_SENT: Check inbox for Access Link OR Code.';
    }
    loading = false;
  }
  // 🔐 PHASE 2: VERIFY CODE
  async function verifyCode() {
    loading = true;
    message = '';

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      message = `ACCESS_DENIED: ${error.message}`;
      loading = false;
    } else {
      message = 'ACCESS_GRANTED: Initializing session...';
      // 🚀 Redirect to Onboarding
      setTimeout(() => goto('/portal/onboarding'), 800);
    }
  }
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-6 font-mono">
  <div class="w-full max-w-md rounded-lg border border-white/5 bg-[#111] p-8 shadow-2xl">

    <div class="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
      <div class="flex items-center gap-2">
        <div class="h-2 w-2 animate-pulse rounded-full {step === 'email' ? 'bg-blue-500' : 'bg-green-500'}"></div>
        <span class="text-[10px] tracking-[0.2em] text-white/50 uppercase">
          {step === 'email' ? 'Security_Protocol: ID' : 'Security_Protocol: OTP'}
        </span>
      </div>
      <span class="text-[9px] text-white/20 uppercase">v1.1.0</span>
    </div>

    <h1 class="mb-2 text-2xl font-black tracking-tighter text-white uppercase">Access_Vault</h1>

    <p class="mb-8 text-xs leading-relaxed text-gray-500">
      {#if step === 'email'}
        Provide authorized email to receive secure access token.
      {:else}
        Enter the 6-digit code sent to <span class="text-blue-400">{email}</span>.
      {/if}
    </p>

    <div class="space-y-4">

      {#if step === 'email'}
        <div class="group">
          <label for="email" class="mb-2 ml-1 block text-[10px] tracking-widest text-blue-500/50 uppercase">
            Identity_Input
          </label>
          <input
            id="email"
            type="email"
            placeholder="user@domain.com"
            bind:value={email}
            class="w-full rounded border border-white/10 bg-black p-4 text-sm text-white transition-all placeholder:text-white/10 focus:border-blue-500/50 focus:outline-none"
            on:keydown={(e) => e.key === 'Enter' && sendCode()}
          />
        </div>
      {:else}
        <div class="group">
          <label for="token" class="mb-2 ml-1 block text-[10px] tracking-widest text-green-500/50 uppercase">
            Secure_Token
          </label>
          <input
            id="token"
            type="text"
            placeholder="000 000"
            bind:value={token}
            class="w-full rounded border border-white/10 bg-black p-4 text-center text-2xl tracking-[0.5em] text-white transition-all placeholder:text-white/5 focus:border-green-500/50 focus:outline-none"
            on:keydown={(e) => e.key === 'Enter' && verifyCode()}
            autocomplete="one-time-code"
          />
        </div>
      {/if}

      <button
        on:click={step === 'email' ? sendCode : verifyCode}
        class="w-full {step === 'email' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Processing...' : (step === 'email' ? 'Request_Token' : 'Authenticate')}
      </button>

      {#if step === 'verify'}
        <button
          on:click={() => { step = 'email'; message = ''; }}
          class="w-full text-[10px] tracking-widest text-white/30 uppercase hover:text-white/50"
        >
          [ Reset_Address ]
        </button>
      {/if}

    </div>

    {#if message}
      <div class="mt-8 rounded border border-white/5 bg-black/50 p-4">
        <p class="text-[10px] {message.includes('ERROR') || message.includes('DENIED') ? 'text-red-500' : 'text-blue-400'} leading-relaxed italic">
          > {message}
        </p>
      </div>
    {/if}

  </div>
</main>