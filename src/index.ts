import './style.scss';
// 行数
const ROW: number = 5;
// 列数
const COL: number = 6;

/**
 * @description 获取dom对象
 * @author angle
 * @date 2020-05-09
 * @template T dom类型
 * @param {string} selector dom选择器
 * @param {HTMLElement} [parentNode=document.body] 父节点
 * @returns {T}
 */
function querySelector<T extends HTMLElement>(
  selector: string,
  parentNode: HTMLElement = document.body
): T {
  const dom: T | null = parentNode.querySelector<T>(selector);
  if (dom) {
    return dom;
  }
  throw new Error(`未找到节点${selector}`);
}

// 父级容器
const containerDom: HTMLDivElement = querySelector<HTMLDivElement>('#arknight');
// 主容器
const numBox: HTMLUListElement = querySelector<HTMLUListElement>('.box-list-num', containerDom);
// 遮罩层
const borderBox: HTMLUListElement = querySelector<HTMLUListElement>(
  '.box-list-border',
  containerDom
);

/**
 * @description 渲染视图
 * @author angle
 * @date 2020-05-09
 * @param {number} rowNum 行数
 * @param {number} colNum 列数
 * @example
 *   renderView(5, 6);
 */
function renderView(rowNum: number, colNum: number): void {
  let numHtml: string = '';
  let borderHtml: string = '';
  for (let i: number = 0; i < rowNum; i++) {
    numHtml += '<li class="box-list-line">';
    borderHtml += '<li class="box-list-line">';
    for (let j: number = 1; j <= colNum; j++) {
      numHtml += `<div class="box" tabindex="0">${i * colNum + j}</div>`;
      borderHtml += `<div class="box"></div>`;
    }
    numHtml += '</li>';
    borderHtml += '</li>';
  }
  numBox.innerHTML = numHtml;
  borderBox.innerHTML = borderHtml;
  containerDom.style.width = `${numBox.offsetWidth}px`;
  containerDom.style.height = `${numBox.offsetHeight}px`;
}

function hasClass(dom: HTMLElement, className: string): boolean {
  return `${dom.className} `.includes(className + ' ');
}

/**
 * @description 鼠标移入
 * @author angle
 * @date 2020-05-09
 * @param {MouseEvent} e
 */
function mouseMoveHandler(e: MouseEvent): void {
  if (e.target && e.target instanceof HTMLDivElement && hasClass(e.target, 'box')) {
    const x: number = e.target.offsetLeft + e.offsetX - 75;
    const y: number = e.target.offsetTop + e.offsetY - 75;
    borderBox.setAttribute('style', `--mask-x: ${x}px;--mask-y: ${y}px;display: block;`);
  }
}

/**
 * @description 鼠标移出
 * @author angle
 * @date 2020-05-09
 * @param {MouseEvent} e
 */
function mouseLeaveHandler(): void {
  borderBox.style.display = 'none';
}

/**
 * @description 事件解版
 * @author angle
 * @date 2020-05-09
 */
function unbind(): void {
  containerDom.removeEventListener<'mousemove'>('mousemove', mouseMoveHandler);
  containerDom.removeEventListener<'mouseleave'>('mouseleave', mouseLeaveHandler);
}

/**
 * @description 事件版定
 * @author angle
 * @date 2020-05-09
 */
function bind(): void {
  unbind();
  containerDom.addEventListener<'mousemove'>('mousemove', mouseMoveHandler);
  containerDom.addEventListener<'mouseleave'>('mouseleave', mouseLeaveHandler);
}

renderView(ROW, COL);
bind();
