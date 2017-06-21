package com.sap.codeinsights;

import java.util.List;
import java.util.ArrayList;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import com.github.javaparser.ast.visitor.VoidVisitorAdapter;
import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.comments.JavadocComment;
import com.github.javaparser.ParseException;
import com.github.javaparser.ast.comments.Comment;

public class DocumentationProcessor extends VoidVisitorAdapter {
	private File file;
	private List<Coder> coders;
	private Git repo;
	
	//TODO remove out
	private String out;

	public DocumentationProcessor(File file, Git repo, List<Coder> coders, String out) throws FileNotFoundException, ParseException, IOException {
		super();
		this.file = file;
		this.repo = repo;
		this.coders = coders;
		//TODO remove out
		this.out = out;

		FileInputStream inputStream = new FileInputStream(file);
		this.visit(JavaParser.parse(inputStream), null);
		inputStream.close();
	}

	private void hasComments(MethodDeclaration n) throws GitAPIException {
		Comment comment = n.getComment();
		ArrayList<Coder> commenters = new ArrayList<Coder>();
		ArrayList<Coder> programmers = new ArrayList<Coder>();
		ArrayList<Coder> allContributors = new ArrayList<Coder>();

		for (int i = comment.getBeginLine(); i <= comment.getEndLine(); i++) {
			Coder commenter = new Coder(repo.blame().setFilePath(path()).call().getSourceAuthor(i-1));
			if (!commenters.contains(commenter)) {
				commenters.add(commenter);
			}
		}

		for (int i = n.getBeginLine(); i <= n.getEndLine(); i++) {
			Coder programmer = new Coder(repo.blame().setFilePath(path()).call().getSourceAuthor(i-1));
			if (!programmers.contains(programmer)) {
				programmers.add(programmer);
			}
		}

		allContributors.addAll(programmers);
		for (Coder c : commenters) {
			if (!allContributors.contains(c)) {
				allContributors.add(c);
			}
		}

		for (Coder contributor : allContributors) {
			coders.get(coders.indexOf(contributor)).methodsContributed++;
		}
		
		for (Coder commenter : commenters) {
			coders.get(coders.indexOf(commenter)).documentationContributed++;
		}

		for (Coder programmer : programmers) {
			coders.get(coders.indexOf(programmer)).documentedMethods++;
		}
	}

	private void noComments(MethodDeclaration n) throws GitAPIException {
		ArrayList<Coder> programmers = new ArrayList<Coder>();

		for (int i = n.getBeginLine(); i <= n.getEndLine(); i++) {
			Coder programmer = new Coder(repo.blame().setFilePath(path()).call().getSourceAuthor(i-1));
			if (!programmers.contains(programmer)) {
				programmers.add(programmer);
			}
		}

		for (Coder programmer: programmers) {
			coders.get(coders.indexOf(programmer)).methodsContributed++;
			coders.get(coders.indexOf(programmer)).undocumentedMethods++;
		}
	}

	private String path() {
		return file.getAbsolutePath().replace(repo.getRepository().getDirectory().getParentFile().getAbsolutePath()+"/", "");
	}
	
	@Override
	public void visit(MethodDeclaration n, Object args) {
		try {
			if (n.getComment() != null) {
				hasComments(n);
			} else {
				noComments(n);
			}
		} catch (GitAPIException e) {
			//TODO do something clever here
		}
	}
}
