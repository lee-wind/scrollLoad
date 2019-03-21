class ScrollLoad{
    constructor(container){
        this.scrollContainer = document.querySelector(container);
        this.scrollRefresh = this.scrollContainer.querySelector('.scroll-refresh');
        this.scrollContent = this.scrollContainer.querySelector('.scroll-content');
        this.scrollLoad = this.scrollContainer.querySelector('.scroll-load');
        
        this.scrollRefreshMarginTop = 0;

        this.startPoint = {
            x: 0,
            y: 0
        }
        this.endPoint = {
            x: 0,
            y: 0
        }

        this.scrollContainer.addEventListener('scroll', this.scroll.bind(this));
        this.scrollContainer.addEventListener('touchstart', this.touchStart.bind(this), false);
        this.scrollContainer.addEventListener('touchmove', this.touchMove.bind(this), false);
        this.scrollContainer.addEventListener('touchend', this.touchEnd.bind(this), false);
    }

    scroll(){

    }
    touchStart(e){
        e.preventDefault();
        let touche = e.touches[0];
        this.startPoint = {
            x: touche.pageX,
            y: touche.pageY
        }
        console.log(`startPoint: ${this.startPoint}`);
    }
    touchMove(e){
        e.preventDefault();
        let touche = e.touches[0];
        this.endPoint = {
            x: touche.pageX,
            y: touche.pageY
        }
        let distance = this.endPoint.y - this.startPoint.y;
        console.log(`拉动距离：${distance}`);

        this.scrollRefresh.style.marginTop = distance + "px";


    }
    touchEnd(e){
        e.preventDefault();
        this.scrollRefresh.style.marginTop = this.scrollRefreshMarginTop + "px";
    }
}