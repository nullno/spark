/**
 * 轮播图
 */
import { _typeof } from '../Common.js'

import SparkUtil from '../SparkUtil.js';

import WidgetManager from '../WidgetManager.js'

import GetAddressData from '../GetAddressData.js'

let CarouselMain = null;

const CarouselWrapper =  function(p) {
              !p && (p = {});

                p.position={x:0,y:0,startX:0,startY:0};
                p.bounded={y:true,parent:false,out:false,disable:true};
                p.type = 'Drag';
                p.on = {
                  press:function(){},
                  hover:function(){
                           CarouselMain.stopAutoPlay();
                  },
                  leave:function(){
                   

                         CarouselMain.option.autoPlay && CarouselMain.startAutoPlay();
                           
                  },
                  move:function(){
                          if(this.bounded.disable)return;
                    

                          if(this.bounded.y){
                              this.displacementBounce = Math.abs(this.position.lastX-this.position.x)>=CarouselMain.option.touchRatio*CarouselMain.width();
                          }
                          if(this.bounded.x){
                               this.displacementBounce = Math.abs(this.position.lastY-this.position.y)>=CarouselMain.option.touchRatio*CarouselMain.height();
                          } 
                  },
                  up:function(){
                     if(!this.displacementSwitch || this.bounded.disable)return;


                     var activeIndex = CarouselMain.activeIndex;

                   
          
                      this.displacementSwitch=false;
                      this.bounded.disable = true;
                      var add = true;//前进或后退
                        if(this.position.direction=='left' || this.position.direction=='up'){
                           if(this.displacementBounce){
                             activeIndex = activeIndex+1;
                              add=true;
                           }else{
                            add=false;
                           }
                          
                           if(activeIndex>this.child.length-1){
                             add=false;
                             activeIndex=this.child.length-1;
                           }
                        }
                        if(this.position.direction=='right' || this.position.direction=='down'){
                            if(this.displacementBounce){
                              activeIndex = activeIndex-1;
                               add=false;
                            }else{
                               add=true;
                            }
                          
                           if(activeIndex<0){
                             add=true;
                             activeIndex=0;
                           }
                        };
                      
                    
            
                    this.displacement(
                          {
                               a:{x:this.position.x,y:this.position.y},
                               b:{x:this.bounded.y?(-this.width()/this.child.length*activeIndex):0,y:this.bounded.x?(-this.height()/this.child.length*activeIndex):0}
                          },
                          add,
                          CarouselMain.option.speed,
                          activeIndex
                          ); 

                  }
                }; 
                /*位移函数计算*/
                p.displacementBounce=true;
                p.displacementSwitch=true;
                p.displacement = function(p,add,time,activeIndex){

                    time=time>1500?1500:time;

                
                    var _this = this;
                    var distance = this.bounded.y?Math.abs(p.b.x-p.a.x):Math.abs(p.b.y-p.a.y);
 
                    var speed = parseInt((distance/time)*200)+1;
                    var TempSpeed = speed;
                     
                        
                    var runTimer=null; 
                    var stime=0;
                     CarouselMain.activeIndex = activeIndex;

                    // 滑动事件
                    if(CarouselMain.on){
                      CarouselMain.on.slideStart && CarouselMain.on.slideStart.call(CarouselMain)
                    }
               
                    if(CarouselMain.option.pagination){
                             CarouselMain.paginationStyle.style=CarouselMain.paginationDefaultStyle;
                      
                             CarouselMain.paginationList.getChild(activeIndex).style=CarouselMain.paginationActiveStyle;
                     }
                    var clearTimer = function(){
                          clearTimeout(runTimer);
                          CarouselMain.activeIndex = activeIndex;
                         
                          _this.displacementSwitch = true;
                           
                          if(CarouselMain.option.allowTouchMove){
                             _this.bounded.disable = false;
                          }
                         if(CarouselMain.on){
                              CarouselMain.on.slideEnd && CarouselMain.on.slideEnd.call(CarouselMain)
                          }

              
                    }
                    var runDisplacement = function(){
                       
                        runTimer = setTimeout(function(){
                       
                             
                              add?(p.a.x-=speed,p.a.y-=speed):(p.a.x+=speed,p.a.y+=speed);
                            
                              stime = 20;
                             
                              speed = parseInt(speed>parseInt(TempSpeed*0.3)?(speed-speed/4):speed)+1;
                              
                              _this.position.x=parseInt(p.a.x);
                              _this.position.y=parseInt(p.a.y);
                              
                              
                              if(add){ //前进
                                  // console.log('前进',speed, _this.position.x)
                                if(_this.bounded.y){
                       
                                    if(p.a.x>p.b.x){
                                     
                                       runDisplacement();
                                    }else{
                                       _this.position.x = p.b.x;
                                      
                                       clearTimer();
                                       
                                    }
                                } 
                                if(_this.bounded.x){
                                    if(p.a.y>p.b.y){
                                       runDisplacement();
                                    }else{
                                       _this.position.y = p.b.y;
                                       clearTimer();
                                    }
                                  }
                               
                              }else{ //后退
                                    // console.log('后退',speed, _this.position.x)
                                 if(_this.bounded.y){  
                                   if(p.a.x<p.b.x){
                                      runDisplacement();
                                    }else{
                                       _this.position.x = p.b.x;
                                      clearTimer();
                                       
                                    }
                                  }  
                                  if(_this.bounded.x){ 
                                      if(p.a.y<p.b.y){
                                         runDisplacement();
                                      }else{
                                         _this.position.y = p.b.y;
                                         clearTimer();
                                      }
                                  }

                              } 

                          var left = (_this.bounded.x)?'':'left:'+_this.position.x+'px;',
                              top =  (_this.bounded.y)?'':'top:'+_this.position.y+'px;';
                              _this.style=left+top;

                       },stime)
                    
                    }; 
                  
                   runDisplacement();
                    
                };  
              
                p.style = 'width:100%;height:100%;position:absolute;background-color:none;overflow:hidden;touch-action:none;';
                   
              return WidgetManager.Drag(p);
            };

 export default function(p) {
               !p && (p = {});
                var option = {
                      direction:'horizontal',//horizontal(默认水平) || vertical(垂直)
                      speed:1000,
                      autoPlay:false,
                      initSlide:0,
                      touchRatio:0.1,
                      allowTouchMove:true,
                     };
                p.option=p.option?Object.assign(option,p.option):option;
                p.activeIndex=0;
                p.inited=false;
                p.autoPlayTimer=null;
                p.autoPlayNext=true;
                p.setPagination  = function(){
            
                  var _this = this;
                  this.paginationStyle = WidgetManager.Css('display:inline-block;width:10px;height:10px;border-radius:10px;margin:5px;background-color:rgba(255,255,255,0.5);');
                  this.paginationDefaultStyle='background-color:rgba(255,255,255,0.5);';
                  this.paginationActiveStyle='background-color:rgba(255,255,255,1);';
                  this.paginationList && this.paginationList.remove();
                  this.paginationList = WidgetManager.List({
                        tag:'div',
                        style:'width:100%;text-align:center;background-color:rgba(0,0,0,0); color:#fff;position:absolute;z-index:0;bottom:0;',
                        data:this.maxIndex+1,
                        item:function(item,index){
                                return  WidgetManager.Box({
                                tag:'i',
                                style:'background-color:rgba(255,255,255,0.5);',  
                                className:_this.paginationStyle,
                                init:function(){
                                   if(item==_this.option.initSlide){
                                      this.style=_this.paginationActiveStyle;
                                   }
                                }, 
                                on:{
                                  click:function(){
                                     _this.slideTo(item);
                                  }
                                }  
                              });
                        }
                     });
                   
                    this.append(this.paginationList)
             
                };
                p.slidePrev = function(time){
                    var activeIndex = this.activeIndex-1;
                    this.slideTo(activeIndex,time)
                };
                p.slideNext = function(time){

                   var activeIndex = this.activeIndex+1;

                    this.slideTo(activeIndex,time);
                    
                      
                };
                p.stopAutoPlay=function(){
                  if(this.autoPlayTimer){

                     clearTimeout(this.autoPlayTimer);
                     // this.option.autoPlay = false;
                     this.autoPlayTimer = null;
                  } 
                }
                p.startAutoPlay=function(time){

                  var _this = this;
                  this.option.autoPlay = time || this.option.autoPlay || true;
                  var time = (this.option.autoPlay === true)?3000:this.option.autoPlay; 
                      time= time>2000?time:2000;
            
                  var WidgetParse = function(){
                   
                    _this.autoPlayTimer = setTimeout(function(){
                                        if(_this.activeIndex === _this.maxIndex){
                                          _this.autoPlayNext = false;
                                        }
                                        if(_this.activeIndex === 0){
                                          _this.autoPlayNext = true;
                                        }
                                        if(_this.autoPlayNext){
                                          _this.slideNext()
                                        }else{
                                           _this.slidePrev()
                                        }
                              WidgetParse()
                       },time)
                  }

                  WidgetParse();
                }
                p.slideTo=function(activeIndex,time){

                  if( activeIndex<0 || activeIndex>this.maxIndex)return;
                  
                    time = time || 1000;
                    var _this = this;
                    var Wrapper = this.Wrapper;
                    if(!Wrapper.displacementSwitch)return;

                    Wrapper.displacementSwitch=false;

                    Wrapper.displacement({
                         a:{x:Wrapper.position.x,y:Wrapper.position.y},
                         b:{x:Wrapper.bounded.y?(-Wrapper.width()/Wrapper.child.length*activeIndex):0,y:Wrapper.bounded.x?(-Wrapper.height()/Wrapper.child.length*activeIndex):0}
                    },
                    activeIndex>=this.activeIndex,
                    time,
                    activeIndex) 
                };
               
                p.appendSlide = function(dom){
               
                   this.Wrapper.append(dom);
                   this.update();
                };
                p.prependSlide = function(dom){
             
                   this.Wrapper.prepend(dom);
                   this.update();

                };
                p.update = function(){
                   var _scope = this;
                   var w=this.width(),h=this.height();
                   var Wrapper =   this.Wrapper;

                    this.style = 'overflow:hidden;position:relative;width:'+w+'px;height:'+h+'px;';
                   
                   /*设置*/
                    Wrapper.bounded.x = (this.option.direction=='vertical')?true:false;
                    Wrapper.bounded.y = (this.option.direction=='vertical')?false:true;
                    Wrapper.bounded.disable =  !this.option.allowTouchMove
                    var WrapperWidth = (this.option.direction=='vertical')?w:w*Wrapper.child.length;
                    var WrapperHeight = (this.option.direction=='vertical')?h*Wrapper.child.length:h; 
                    
                    Wrapper.style='overflow:hidden;position:absolute;width:'+WrapperWidth+'px;height:'+WrapperHeight+'px;';
                     
                    
                    SparkUtil.traverse(Wrapper.child,function(name,index,end){
                       var _slide =  GetAddressData(name);
                           _slide.style='position:relative;width:'+w+'px;height:'+h+'px;'+(p.option.direction=='vertical'?'':'float:left;');
                    });
                   
                    this.maxIndex = Wrapper.child.length-1;

                    this.option.initSlide =this.option.initSlide>this.maxIndex?this.maxIndex:this.option.initSlide;
                     
                    var  slideIndex = this.inited?this.activeIndex:this.option.initSlide;
                   
                    if(this.option.pagination){
                       this.setPagination();
                    }
                    
                     if(_typeof(slideIndex,'Number')){
                      var _this=this;
                      var timer = setTimeout(function(){
                              clearTimeout(timer)
                             _this.slideTo(slideIndex,100);

                       }) 
                  
                     }
                     
                     
                };
               
                p.init = function(){
                     this.update();
                     this.activeIndex = this.option.initSlide;
                     this.onInit && this.onInit();
                     this.inited = true;

                     this.option.autoPlay && this.startAutoPlay();
                }
                 
               var Wrapper =  CarouselWrapper({
                            child:p.child
                          });
                p.Wrapper = Wrapper;

                p.child = [Wrapper];

                p.style = p.style?p.style+'position:relative;overflow:hidden;':'position:relative;width:100%;height:100%;overflow:hidden;';       
                 
                CarouselMain = WidgetManager.Box(p);  
                return  CarouselMain;
            };
