
window.onload = async e => {
  $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
  const response = await fetchCall('/stats');
  const stats = response.data;
  for (const stat in stats) {
    const countElem = $(`.item-${stat} .count`);
    if (countElem) countElem.innerHTML = stats[stat];
  }
}