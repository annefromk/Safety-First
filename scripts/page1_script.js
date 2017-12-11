let selectedForDemographic = {}
const criminal_data = [[6, 24], [20, 129], [20, 264], [57, 1237], [130, 3867],
                       [56, 940], [41, 449], [24, 282], [10, 88]]

$('#question-age').hide()

const showQuestion = (type) => {
  if (type === 'age') {
    $('#question-gender').hide()
    $('#question-age').show()
    $(`.selector-item[value="${ selectedForDemographic.age }"]`).addClass('selected')
  } else if (type === 'gender'){
    $('#question-age').hide()
    $('#question-gender').show()
    $(`.selector-item[value="${ selectedForDemographic.gender }"]`).addClass('selected')
  }
}

const styleBreadcomb = (type, value) => {
  if (type === 'age') {
    if (value === 'unstyle') {
      $('#age-bc').text('연령')
      $('#age-bc').css('border', '2px solid #FCAF17')
      $('#age-bc').css('background-color', 'white')
      $('#age-bc').css('color', '#959494')
    } else {
      $('#age-bc').text(value)
      $('#age-bc').css('border', '2px solid #5D81C3')
      $('#age-bc').css('background-color', '#5D81C3')
      $('#age-bc').css('color', 'white')
    }
  } else if (type === 'gender') {
    if (value === 'unstyle') {
      $('#gender-bc').text('성별')
      $('#gender-bc').css('border', '2px solid #FCAF17')
      $('#gender-bc').css('background-color', 'white')
      $('#gender-bc').css('color', '#959494')
    } else {
      $('#gender-bc').text(value)
      $('#gender-bc').css('border', '2px solid #5D81C3')
      $('#gender-bc').css('background-color', '#5D81C3')
      $('#gender-bc').css('color', 'white')
    }
  }
}

const transferValueToIndex = (selectedForDemographic) => {
  result = {}
  if (selectedForDemographic.gender === '남성') {
    result.gIndex = 0
  } else if (selectedForDemographic.gender === '여성') {
    result.gIndex = 1
  } else {
    result.gIndex = -1
  }

  if (selectedForDemographic.age === '6세 이하') {
    result.aIndex = 0
  } else if (selectedForDemographic.age === '12세 이하') {
    result.aIndex = 1
  } else if (selectedForDemographic.age === '15세 이하') {
    result.aIndex = 2
  } else if (selectedForDemographic.age === '20세 이하') {
    result.aIndex = 3
  } else if (selectedForDemographic.age === '30세 이하') {
    result.aIndex = 4
  } else if (selectedForDemographic.age === '40세 이하') {
    result.aIndex = 5
  } else if (selectedForDemographic.age === '50세 이하') {
    result.aIndex = 6
  } else if (selectedForDemographic.age === '60세 이하') {
    result.aIndex = 7
  } else if (selectedForDemographic.age === '60세 초과') {
    result.aIndex = 8
  } else {
    result.aIndex = -1
  }

  return result
}

const getVictim = () => {
  const indices = transferValueToIndex(selectedForDemographic)
  console.log(indices)
  g = indices.gIndex
  a = indices.aIndex

  if (g === -1 && a === -1) {
    return 8780
  } else if (g != -1 && a != -1) {
    return criminal_data[a][g]
  }

  if (g === -1) {
    return criminal_data[a].reduce((p1, p2) => {return p1 + p2})
  } else if (a === -1) {
    let result = criminal_data.map(x => x[g])
    return result.reduce((e1, e2) => {return e1 + e2})
  }
}

$('.selector-item').on('click', function(){
  if ($(this).attr('qtype') === 'gender') {
    if ($(this).hasClass('selected')) {
      selectedForDemographic.gender = undefined
      styleBreadcomb('gender', 'unstyle')
    } else {
      selectedForDemographic.gender = $(this).attr('value')
      showQuestion('age')
      styleBreadcomb('gender', selectedForDemographic.gender)
    }
  } else {
    if ($(this).hasClass('selected')) {
      selectedForDemographic.age = undefined
      styleBreadcomb('age', 'unstyle')
    } else {
      selectedForDemographic.age = $(this).attr('value')
      showQuestion('gender')
      styleBreadcomb('age', selectedForDemographic.age)
    }
  }
  $(this).toggleClass('selected')
  $(this).siblings().removeClass('selected')

  $('#victim').text(getVictim())
})

$('.selector-item').hover(function() {
  $(this).addClass('hover')
}, function() {
  $(this).removeClass('hover')
})

$('.navi-none-age').on('click', function() {
  showQuestion('age')
})
$('.navi-none-gender').on('click', function() {
  showQuestion('gender')
})
