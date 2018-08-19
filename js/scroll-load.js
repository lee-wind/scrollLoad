class ScrollLoad{
    constructor(container, {
        scrollContainerElTranslateY = 0,
        scrollRefresh,
        scrollLoad
    }){
        this.scrollContainerEl = document.body.querySelector(container);
        console.log(this.scrollContainerEl);
        this.scrollRefreshEl = this.scrollContainerEl.querySelector('.scroll-refresh');
        this.scrollContentEl = this.scrollContainerEl.querySelector('.scroll-content');
        this.scrollLoadEl = this.scrollContainerEl.querySelector('.scroll-load');

        this.scrollContainerElTranslateY = scrollContainerElTranslateY;
        this.scrollRefresh = scrollRefresh;
        this.scrollLoad = scrollLoad;

        this.scrollContainerEl.style.transform = "translate3d(0, "+ this.scrollContainerElTranslateY + "px, 0)";

        this.canPullDown = false;
        this.hasPullTop = false;
        this.isPulling = false;
        this.startPointY = 0;
        this.endPointY = 0;

        window.addEventListener('scroll', this.scroll.bind(this), false);
        this.scrollContainerEl.addEventListener('touchstart', this.touchStart.bind(this), false);
        this.scrollContainerEl.addEventListener('touchmove', this.touchMove.bind(this), false);
        this.scrollContainerEl.addEventListener('touchend', this.touchEnd.bind(this), false);
        this.scrollContainerEl.addEventListener('transitionend', this.transitionEnd.bind(this), false);
    }
    scroll(){
        if(window.innerHeight + window.scrollY + Math.abs(this.scrollContainerElTranslateY) === this.scrollContainerEl.offsetHeight){
            console.log("已经到底部了");
            this.scrollLoad();
        }
    }
    touchStart(e){
        if(this.scrollContainerEl.getBoundingClientRect().top === this.scrollContainerElTranslateY){
            this.canPullDown = true;
            let touche = e.touches[0];
            this.startPointY = touche.pageY;
            //console.log(`startPoint: ${this.startPoint}`);
        }
    }

    touchMove(e){
        if(this.canPullDown){
            let touche = e.touches[0];
            this.endPointY = touche.pageY;
            let distance = this.scrollContainerElTranslateY + this.endPointY - this.startPointY;
            //console.log(`拉动距离：${distance}`);

            if(distance < this.scrollContainerElTranslateY){ //上滑
                this.canPullDown = false;
            }
            if(distance > 0){ //下拉到顶部
                this.canPullDown = false;
                this.hasPullTop = true;
                console.log("下拉刷新");
                distance = this.scrollContainerElTranslateY;
                this.scrollRefreshEl.innerHTML = "释放后刷新";
            }
            if(distance < 0 && distance > this.scrollContainerElTranslateY){ //下拉过程
                this.isPulling = true;
                this.scrollContainerEl.style.transform = "translate3d(0, "+ distance + "px, 0)";
            }
        }
    }
    touchEnd(e){
        //e.preventDefault();
        if(this.isPulling){
            this.scrollContainerEl.style.transform = "translate3d(0, "+ this.scrollContainerElTranslateY + "px, 0)";
            this.scrollContainerEl.style.transition = "transform .3s ease-in";
        }
    }
    transitionEnd(){
        this.scrollRefreshEl.innerHTML = "请下拉到顶部";
        this.scrollContainerEl.style.transition = "";
        this.isPulling = false;
        if(this.hasPullTop){
            this.hasPullTop = false;
            this.scrollRefresh(); //刷新函数
        }
    }
}