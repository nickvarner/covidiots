const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Submission = require('../../models/Submission');
const User = require('../../models/User');

// @route    POST api/submission
// @desc     Create a submission
// @access   Private

router.post('/', auth, body('content', 'content is required').notEmpty(), async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');

		const newSubmission = new Submission({
			user        : req.user.id,
			userName    : user.username,
			avatar      : user.avatar,
			url         : req.body.url,
			title       : req.body.title,
			description : req.body.description,
			imgUrl      : req.body.imgUrl,
			author      : req.body.author,
			content     : req.body.content,
			published   : req.body.published,
			date        : req.body.date
		});
		const submission = await newSubmission.save();
		res.json(submission);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    GET api/submissions
// @desc     get all submissions
// @access   Public

router.get('/', async (req, res) => {
	try {
		const submissions = await Submission.find().sort({ date: -1 });
		res.json(submissions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    GET api/submissions/:id
// @desc     get submission by id
// @access   Public

router.get('/:id', async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id);
		if (!submission) return res.status(404).json({ msg: 'submission not found' });
		res.json(submission);
	} catch (err) {
		if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'submission not found' });
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    DELETE api/submissions/:id
// @desc     DELETE submission by id
// @access   Private

router.delete('/:id', auth, async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id);
		// we want to make sure that the user who is deleting the post is the user that posted it
		// check user
		if (submission.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}
		if (!submission) return res.status(404).json({ msg: 'submission not found' });
		await submission.remove();
		res.json({ msg: 'submission deleted' });
	} catch (err) {
		if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'submission not found' });
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    PUT api/submissions/vote/:id
// @desc     like a post
// @access   Private

router.put('/like/:id', auth, async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id);
		// check if the post has already been liked by this user
		if (submission.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
			res.status(400).json({ msg: 'submission already voted' });
		}

		submission.likes.unshift({ user: req.user.id });
		await submission.save();
		res.json(submission.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    delete api/submissions/like/:id
// @desc     unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id);
		// check if the post has already been liked by this user
		if (submission.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
			res.status(400).json({ msg: 'submission has not yet been liked' });
		}
		// get remove index
		const removeIdx = submission.likes.map((like) => like.user.toString()).indexOf(req.user.id);
		submission.likes.splice(removeIdx, 1);
		await submission.save();
		res.json(submission.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    POST api/submissions/comment/:id
// @desc     comment on a submission
// @access   Private

router.post('/comment/:id', auth, body('text', 'comment is required').notEmpty(), async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');
		const submission = await Submission.findById(req.params.id);
		const newComment = {
			user     : req.user.id,
			text     : req.body.text,
			userName : user.username,
			avatar   : user.avatar
		};
		submission.comments.unshift(newComment);
		await submission.save();
		res.json(submission.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// @route    DELETE api/submissions/comment/:id/:comment_id
// @desc     delete comment on a submission
// @access   Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		// get the submission
		const submission = await Submission.findById(req.params.id);
		// pull out the comment from the post
		// this will give us the comment if it exists or false if it doesnt
		const comment = submission.comments.find((comment) => comment.id === req.params.comment_id);
		if (!comment) {
			return res.status(404).json({ msg: 'comment with that id does not exist' });
		}
		// check ownership of comment with the user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}
		// get remove index
		const removeIdx = submission.comments.map((comment) => comment.user.toString()).indexOf(req.params.comment_id);
		submission.comments.splice(removeIdx, 1);
		await submission.save();
		res.json(submission.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
