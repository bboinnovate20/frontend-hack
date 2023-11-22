
const stateIcons = {

    defaultState: `
                <svg role="checkbox" tabindex="0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#8A8A8A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 6" />
            </svg>
            `,
    loadingState: `   <svg id="rotate-loading" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                        d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2"
                        stroke="#1C181D"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
            `,
    
    checkedStatus: `
                <svg id="checked" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#1C181D"></circle>
                <path
                d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
                fill="#fff"
                ></path>
            </svg>
        `,          
}
let countValue = 0;

const useState = [];
// section checkbox section
function toggleChecks() {
    const checkStatus = document.querySelectorAll(".check-box-status");

    checkStatus.forEach(element => {
        useState.push({ele: element, state: false});

        // event listener
        element.addEventListener('click', () => toggleState(element))
        element.addEventListener('keypress', () => toggleState(element))
    });

    // event listener

    
}

toggleChecks();

function toggleState(element) {
    const getElement = useState.find(({ele}) => ele == element);
    console.log(useState.length)
    if(getElement.state) {
        if(countValue >= 0) {countValue--; updateProgress(countValue, useState.length);}
        getElement.state = false;
        return element.innerHTML = stateIcons.defaultState;
    }


    
    element.innerHTML = stateIcons.loadingState;
    setTimeout(() => {
        element.innerHTML = stateIcons.checkedStatus;
        // update the state
        getElement.state = true;
        if(countValue <= useState.length){countValue++; updateProgress(countValue, useState.length);}
    }, 500)
}

// section headers
function subheaderEvent() {
    const subheader = document.querySelectorAll(".bold-subhead");
    subheader.forEach(element => {
        utilEvent(element, subheader, 'click');
        utilEvent(element, subheader, 'keypress');
    });
}

function utilEvent(element, arrayNode, event) {
    element.addEventListener(event, () => {
        const parentElement = element.parentElement.parentElement.parentElement;
                
        // remove all classes
        arrayNode.forEach(element => {
                const allEleParent = element.parentElement.parentElement.parentElement;
                if(allEleParent.classList.contains("expand")) allEleParent.classList.remove("expand")
        });
    
        return parentElement.classList.add("expand") 
    });
}


// progress bar
function updateProgress(value, totalCount) {
    
    const progressCount = document.querySelector("#progress-count");
    const progressBar = document.querySelector("#progress-bar span"); 
    progressBar.style.transition = `width ${.3}s ease`
    progressBar.style.width = `${(value/(totalCount)) * 100}%`
    
    progressCount.textContent = `${value} / ${totalCount} completed`
}

// collapse func

function expandCollapse() {
    const arrow = document.querySelector("#collapse");
    const section = document.querySelector(".upper-section")
    
    eventListener('click');
    eventListener('keypress');

    function eventListener(event) {
        arrow.addEventListener(event, () => {
            arrow.style.transition = `transform ${.3}s ease`
            if(section.classList.contains("showCollapse")){
                arrow.style.transform = `rotate(${0}deg)`
    
                return section.classList.remove("showCollapse")
            }
            arrow.style.transform = `rotate(${180}deg)`
            return section.classList.add("showCollapse")
        })
    }
}

// dialogue & alert
function dialogueToggle() {
    const profileHead = document.querySelector(".profile-header");
    const notification = document.querySelector(".notification-bar");
    const dialogue = document.querySelector(".dialog");
    const alert = document.querySelector(".alert");
    const info = document.querySelector(".info-notif");


    notification.addEventListener('click', () => eventListener(alert, dialogue))
    profileHead.addEventListener('click', () => eventListener(dialogue, alert))
    
    function eventListener(node, node2) {
        
        // node.classList.remove("show")
        node2.classList.remove("show")
        
        if(node.classList.contains("show")) return node.classList.remove("show")
        
        node.classList.add("show")

    }

}



subheaderEvent();
expandCollapse();
dialogueToggle();