import React from "react";

function QuestionItem({ question, setQuestions }) {
	const { id, prompt, answers, correctIndex } = question;

	const options = answers.map((answer, index) => (
		<option key={index} value={index}>
			{answer}
		</option>
	));

	const handleDelete = (event) => {
		event.preventDefault();
		fetch(`http://localhost:4000/questions/${id}`, {
			method: "DELETE",
			headers: { Accepts: "application/json" },
		})
			.then((r) => r.json())
			.then(setQuestions((questions) => questions.filter((q) => q.id !== id)));
	};

	const updateCorrectAnswer = (e) => {
		fetch(`http://localhost:4000/questions/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ correctIndex: Number.parseInt(e.target.value) }),
		})
			.then((r) => r.json())
			.then(setQuestions((questions) => questions));
	};

	return (
		<li>
			<h4>Question {id}</h4>
			<h5>Prompt: {prompt}</h5>
			<label>
				Correct Answer:
				<select defaultValue={correctIndex} onChange={updateCorrectAnswer}>
					{options}
				</select>
			</label>
			<button onClick={handleDelete}>Delete Question</button>
		</li>
	);
}

export default QuestionItem;
