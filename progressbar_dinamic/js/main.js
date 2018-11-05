// Main JavaScript

window.onload = function(){
    
    var progress_360 = document.getElementsByClassName('progress-360');
    var progress_180 = document.getElementsByClassName('progress-180');
	
	// Get Computed Style Background Color CSS 
    var back = document.getElementById('color');
    var color = window.getComputedStyle(back, null).getPropertyValue('background-color'); 
    
    for (let i = 0; i < progress_180.length; i++) {

        // Percent only part whole
        let percent = parseInt(document.getElementsByClassName('text-percent')[i].innerHTML.replace('%',''));

        let percent_deg_180 = [];
        let percent_deg_360 = [];
        
        if (percent <= 50) {
            percent_deg_180[i] = percent * 360 / 100 + 1; // (45% x 180º / 100)
            percent_deg_360[i] = 0;
        } else {
            percent_deg_180[i] = 50 * 360 / 100 + 1;  // (50% x 180º / 100)
            percent_deg_360[i] = (percent - 50) * 360 / 100 + 1; // (5% x 180º / 100) 
        }

        let index = 0;
        let percent_dinamic;
        let id = setInterval(animate_progress_180, 10);
        
        function animate_progress_180() {
            let deg = -90 + (180 / 100 * index);
            if (deg >= -90 + percent_deg_180[i] || deg > 90) {
                clearInterval(id);
                if (percent > 50) {
                    index = 0.00;
                    id = setInterval(animate_progress_360, 10);   
                }
            } else {
                progress_180[i].style.background = 'linear-gradient('+ deg +'deg, transparent 50%, ' + color + ' 50%)';
                percent_dinamic = (deg + 90) / 360 * 100; 
                document.getElementsByClassName('text-percent')[i].innerHTML = percent_dinamic.toFixed() + '%';  
                index++;
            }
        }

        function animate_progress_360() {
            let deg = 90 + (180 / 100 * index);
            if (deg >= 90 + percent_deg_360[i] || deg > 270) {
                clearInterval(id);
            } else {
                progress_360[i].style.background = 'linear-gradient('+ deg +'deg, transparent 50%, ' + color + ' 50%)';
                percent_dinamic = (deg + 90) / 360 * 100;
                document.getElementsByClassName('text-percent')[i].innerHTML = percent_dinamic.toFixed() + '%';
                index++;
            }  
        }        
    }
}
