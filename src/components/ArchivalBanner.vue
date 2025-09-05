<template>
  <div class="archived message-box">
    ¡No más! This blog has been archived and is no longer being updated.
    <ol>
      <li>Check out my other projects, easily indexed from <a href="https://edm00se.codes/">edm00se.codes</a></li>
      <li>Connect with me on the fediverse, such as my mastodon account <a href="https://hachyderm.io/@edm00se">@edm00se@hachyderm.io</a>.</li>
      <li>Delete this message from <code>_includes/layouts/home.njk</code>.</li>
    </ol>
    <p>This blog is being maintained for archival purposes and should eventually be converted to a purely static site. If you find something useful here, that's great! Just note that the passage of time may color the writings contained herein. Date of posting should be viewable on every post, so double check that please.</p>
  </div>
</template>

<style lang="scss">
/* Message Box */
.message-box {
	--color-message-box: #ffc;
	display: block;
	background-color: var(--color-message-box);
	color: var(--color-gray-90);
	padding: 1em 0.625em; /* 16px 10px /16 */
}

.message-box ol {
	margin-top: 0;
}

@media (prefers-color-scheme: dark) {
	.message-box {
		--color-message-box: #082840;
	}
}
</style>