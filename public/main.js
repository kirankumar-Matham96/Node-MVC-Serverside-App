async function confirmDelete(id) {
  try {
    const isConfirmed = confirm("Do you want to delete?");
    // isConfirmed &&
    if (isConfirmed) {
      const res = await fetch(`/delete-product/${id}`, { method: "POST" });
      if (res.ok) {
        // reload/refresh the page
        location.reload();
      }
    }

    // "/delete-product/<%= product.id %>"
  } catch (error) {
    console.log(error);
  }
}
