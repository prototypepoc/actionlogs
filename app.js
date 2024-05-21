document.addEventListener("DOMContentLoaded", () => {
    const recordedActions = document.getElementById("recordedActions");
    const submitBtn = document.getElementById("submitBtn");
    const progressWheel = document.getElementById("progressWheel");
    const scrollableParagraph = document.getElementById("scrollableParagraph");

    let touchData = JSON.parse(localStorage.getItem("touchData")) || [];

    const saveTouchData = () => {
        localStorage.setItem("touchData", JSON.stringify(touchData));
    };

    const displayLastAction = (action) => {
        recordedActions.textContent = `Last Action: ${JSON.stringify(action)}`;
    };

    const recordAction = (type, details) => {
        const action = { type, ...details, timestamp: Date.now() };
        touchData.push(action);
        saveTouchData();
        displayLastAction(action);
    };

    // Restore last action on load
    if (touchData.length) {
        displayLastAction(touchData[touchData.length - 1]);
    }

    const touchStartHandler = (event) => {
        const touch = event.touches[0];
        recordAction("touchstart", { startX: touch.pageX, startY: touch.pageY });
    };

    const touchEndHandler = (event) => {
        const touch = event.changedTouches[0];
        recordAction("touchend", { endX: touch.pageX, endY: touch.pageY });
    };

    const touchMoveHandler = (event) => {
        const touch = event.touches[0];
        recordAction("touchmove", { moveX: touch.pageX, moveY: touch.pageY });
    };

    const clickHandler = (event) => {
        recordAction("click", { x: event.pageX, y: event.pageY });
    };

    const dblClickHandler = (event) => {
        recordAction("dblclick", { x: event.pageX, y: event.pageY });
    };

    const mouseMoveHandler = (event) => {
        recordAction("mousemove", { x: event.pageX, y: event.pageY });
    };

    const scrollHandler = (event) => {
        recordAction("scroll", { scrollTop: scrollableParagraph.scrollTop });
    };

    const submitHandler = async () => {
        progressWheel.style.display = "block";

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Convert data to JSON and send to placeholder API
        console.log("Submitting data:", JSON.stringify(touchData));

        // Clear local storage and data
        localStorage.removeItem("touchData");
        touchData = [];
        recordedActions.textContent = "Last Action:";

        // Refresh page
        progressWheel.style.display = "none";
        location.reload();
    };

    if ('ontouchstart' in document.documentElement) {
        document.addEventListener("touchstart", touchStartHandler);
        document.addEventListener("touchend", touchEndHandler);
        document.addEventListener("touchmove", touchMoveHandler);
    }

    document.addEventListener("click", clickHandler);
    document.addEventListener("dblclick", dblClickHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    scrollableParagraph.addEventListener("scroll", scrollHandler);

    submitBtn.addEventListener("click", submitHandler);
});
