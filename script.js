
document.addEventListener('DOMContentLoaded', () => {
       const currentTime = document.getElementById('current_time');

       if (!currentTime) return;

       const refresh = () => {
           currentTime.textContent = Date.now().toString();
       };

        refresh();  //ensures the time is shown right away before the first interval
        const intervalID = setInterval(refresh, 1000);

        window.addEventListener('beforeunload', () => {
            clearInterval(intervalID);
        }, {once:true});
}, {once:true});


