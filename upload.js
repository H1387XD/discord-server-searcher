

document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(uploadForm);
        
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Server updated successfully');
            } else {
                alert('Failed to update server');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    });
});