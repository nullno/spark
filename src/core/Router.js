import Spark from './index'

function router(){

      this.name='hi router';

}

window.addEventListener('hashchange',function(e){
  console.log(123)

    Spark.Render_Test()
})


//劫持widget

console.log('init router')

export default router;