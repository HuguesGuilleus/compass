// Copyright 2020, GUILLEUS Hugues <ghugues@netc.fr>
// BSD 3-Clause License

(async function () {
	if (!('serviceWorker' in navigator)) {
		console.warn("serviceWorker is not supported");
		return;
	}
	let reg = await navigator.serviceWorker.register("sw-cache.js");
	let pwaUpdate = document.getElementById("pwaUpdate");
	if (!pwaUpdate) {
		console.warn("There are not #pwaUpdate element.");
		return;
	}
	pwaUpdate.addEventListener("click", async () => {
		if (!navigator.onLine) {
			window.alert("Vous devez être en ligne pour faire une mise à jour.")
			pwaUpdate.style.color = "red";
			return;
		}
		pwaUpdate.style.color = "blue";
		await reg.unregister();
		await navigator.serviceWorker.register("sw-cache.js");
		document.location.reload();
	});
})();

window.addEventListener("beforeinstallprompt", event => {
	let b = document.getElementById("pwaInstallation");
	if (!b) {
		console.warn("There are no #pwaInstallation element");
		return;
	}
	b.hidden = false;
	b.addEventListener("click", () => event.prompt().catch(console.error));
});
